"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, MessageSquare, ExternalLink, Upload } from "lucide-react";
import FileUpload from "@/components/ui/file-upload";
import { createNotification } from "@/lib/notifications";

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  progress: number;
  startDate?: string;
  dueDate?: string;
}

const statusConfig: Record<string, { color: string; label: string }> = {
  planning: { color: "#CCFF00", label: "Planning" },
  in_progress: { color: "#00CCFF", label: "In Progress" },
  review: { color: "#CCFF00", label: "Review" },
  completed: { color: "#00FF88", label: "Completed" },
};

export default function AdminProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((r) => r.json())
      .then((data) => { setProject(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;
  if (!project) return <div className="text-center py-20 text-bl-ice/40">Project not found</div>;

  const cfg = statusConfig[project.status] || { color: "#666", label: project.status };

  return (
    <div>
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-bl-ice/40 hover:text-bl-gold mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="spatial-panel p-6 rounded-2xl border border-white/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-bl-ice">{project.name}</h1>
                {project.description && <p className="text-sm text-bl-ice/40 mt-2">{project.description}</p>}
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full border whitespace-nowrap"
                style={{ borderColor: `${cfg.color}30`, color: cfg.color, backgroundColor: `${cfg.color}10` }}>
                {cfg.label}
              </span>
            </div>
            {project.progress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-bl-ice/40 mb-2">
                  <span>Progress</span><span>{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${project.progress}%`, backgroundColor: cfg.color }} />
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-4 text-[10px] text-bl-ice/30">
              {project.startDate && <span className="flex items-center gap-1"><Clock size={10} /> Started: {project.startDate}</span>}
              {project.dueDate && <span className="flex items-center gap-1"><Clock size={10} /> Due: {project.dueDate}</span>}
            </div>
          </div>

          {/* Comments */}
          <div className="spatial-panel p-6 rounded-2xl border border-white/5">
            <h2 className="text-sm font-semibold text-bl-ice mb-4 flex items-center gap-2"><MessageSquare size={14} /> Comments</h2>
            <div className="text-center py-8 text-xs text-bl-ice/30">
              <MessageSquare size={24} className="mx-auto mb-2 opacity-30" />
              No comments yet
            </div>
            <div className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-bl-ice placeholder:text-bl-ice/20 outline-none focus:border-bl-gold/30 transition-colors"
              />
              <button
                onClick={() => { createNotification(); setComment(""); }}
                className="px-4 py-2 bg-bl-gold text-bl-deep text-xs font-semibold rounded-xl hover:bg-bl-gold/90 transition-colors"
              >
                Send
              </button>
            </div>
          </div>

          {/* Files */}
          <div className="spatial-panel p-6 rounded-2xl border border-white/5">
            <h2 className="text-sm font-semibold text-bl-ice mb-4 flex items-center gap-2"><Upload size={14} /> Files</h2>
            <FileUpload label="Upload project files" multiple />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="spatial-panel p-5 rounded-2xl border border-white/5">
            <h3 className="text-xs font-semibold text-bl-ice mb-4 uppercase tracking-wider">Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 bg-bl-gold text-bl-deep text-xs font-semibold rounded-xl">
                <CheckCircle size={12} /> Mark Complete
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 border border-white/10 text-bl-ice text-xs rounded-xl hover:bg-white/5">
                <ExternalLink size={12} /> Open Preview
              </button>
            </div>
          </div>

          {/* Team */}
          <div className="spatial-panel p-5 rounded-2xl border border-white/5">
            <h3 className="text-xs font-semibold text-bl-ice mb-4 uppercase tracking-wider">Team</h3>
            <div className="text-center py-6 text-xs text-bl-ice/30">No team members assigned</div>
          </div>
        </div>
      </div>
    </div>
  );
}
