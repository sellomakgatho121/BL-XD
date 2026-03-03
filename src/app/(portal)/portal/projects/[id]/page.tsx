"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { FileUpload, ProjectFile } from "@/components/ui/file-upload";
import { createNotification } from "@/lib/notifications";
import { FilePreview } from "@/components/annotations/FilePreview";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in_progress" | "review" | "completed" | "on_hold";
  client_id: string;
  client: {
    id: string;
    full_name: string;
    email: string;
    company_name: string;
  };
  phases: Array<{
    id: string;
    name: string;
    status: string;
    due_date: string;
  }>;
  files: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    created_at: string;
  }>;
  messages: Array<{
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
  }>;
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  planning: { label: "Planning", color: "text-[var(--signal-lime)]", icon: Clock },
  in_progress: { label: "In Progress", color: "text-[var(--electric-purple)]", icon: AlertCircle },
  review: { label: "Review", color: "text-[var(--spectral-white)]", icon: MessageSquare },
  completed: { label: "Completed", color: "text-[var(--success)]", icon: CheckCircle2 },
  on_hold: { label: "On Hold", color: "text-[var(--siren-red)]", icon: AlertCircle },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        
        if (!response.ok) {
          throw new Error("Project not found");
        }

        const data = await response.json();
        setProject(data.project);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    }

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const handleFilesChange = async (newFiles: Project["files"]) => {
    if (!project) return;

    // Update local state
    setProject({ ...project, files: newFiles });

    // Notify admin about new files
    try {
      const { data: adminProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "admin")
        .limit(1)
        .single();

      if (adminProfile) {
        await createNotification(
          adminProfile.id,
          "project_update",
          "New Files Uploaded",
          `${newFiles.length} file(s) uploaded to project "${project.name}"`,
          { project_id: project.id, file_count: newFiles.length }
        );
      }
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">LOADING...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-[var(--spectral-dim)] mb-6">{error}</p>
        <Link href="/portal/dashboard">
          <Button className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/portal/dashboard"
            className="flex items-center gap-2 text-sm text-[var(--spectral-muted)] hover:text-[var(--spectral-white)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className={`flex items-center gap-2 ${status.color}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-mono uppercase">{status.label}</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="border border-[var(--border)] bg-[var(--card)] p-6">
        <h1 className="text-3xl font-black tracking-tighter mb-4">{project.name}</h1>
        <p className="text-[var(--spectral-dim)] mb-6">{project.description}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Client</h3>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--spectral-muted)]" />
              <div>
                <p className="font-medium">{project.client.full_name}</p>
                <p className="text-sm text-[var(--spectral-dim)]">{project.client.company_name}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[var(--spectral-muted)]" />
                Created: {new Date(project.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[var(--spectral-muted)]" />
                Updated: {new Date(project.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Paperclip className="w-4 h-4 text-[var(--spectral-muted)]" />
                {project.files.length} Files
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-[var(--spectral-muted)]" />
                {project.messages.length} Messages
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Phases */}
      {project.phases.length > 0 && (
        <div className="border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-bold mb-4">Project Phases</h2>
          <div className="space-y-3">
            {project.phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-[var(--onyx)] rounded-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--signal-lime)]/10 text-[var(--signal-lime)] rounded-full flex items-center justify-center text-sm font-mono">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{phase.name}</h3>
                    <p className="text-sm text-[var(--spectral-dim)]">
                      Due: {new Date(phase.due_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 text-xs font-mono uppercase rounded-full ${
                  phase.status === "completed" 
                    ? "bg-[var(--success)]/10 text-[var(--success)]"
                    : phase.status === "in_progress"
                    ? "bg-[var(--electric-purple)]/10 text-[var(--electric-purple)]"
                    : "bg-[var(--spectral-muted)]/10 text-[var(--spectral-muted)]"
                }`}>
                  {phase.status.replace("_", " ")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Files Section */}
      <div className="border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-xl font-bold mb-4">Project Files</h2>
        <FileUpload
          projectId={project.id}
          files={project.files}
          onFilesChange={handleFilesChange}
          onPreviewFile={setPreviewFile}
        />
      </div>

      <AnimatePresence>
        {previewFile && (
          <FilePreview
            file={previewFile}
            projectId={project.id}
            onClose={() => setPreviewFile(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
