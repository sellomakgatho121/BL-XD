"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Clock } from "lucide-react";

const statusConfig: Record<string, { color: string; label: string }> = {
  planning: { color: "#B59A5F", label: "Planning" },
  in_progress: { color: "#00CCFF", label: "In Progress" },
  review: { color: "#D7FF00", label: "Review" },
  completed: { color: "#00FF88", label: "Completed" },
};

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((projects) => {
        const found = projects.find((p: any) => p.id === params.id);
        setProject(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="flex justify-center pt-20"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;
  if (!project) return <div className="text-center pt-20 text-bl-ice/40">Project not found</div>;

  const cfg = statusConfig[project.status] || { color: "#666", label: project.status };

  return (
    <div>
      <Link href="/portal/projects" className="inline-flex items-center gap-2 text-sm text-bl-ice/40 hover:text-bl-gold mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <div className="spatial-panel p-8 rounded-3xl border border-white/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-bl-ice">{project.name}</h1>
            {project.description && <p className="text-sm text-bl-ice/40 mt-2">{project.description}</p>}
          </div>
          <span className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: `${cfg.color}30`, color: cfg.color, backgroundColor: `${cfg.color}10` }}>{cfg.label}</span>
        </div>
        {project.progress > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-bl-ice/40 mb-2">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${project.progress}%`, backgroundColor: cfg.color }} />
            </div>
          </div>
        )}
        <div className="flex gap-6 text-xs text-bl-ice/30">
          {project.startDate && <span className="flex items-center gap-1"><Clock size={12} /> Started: {project.startDate}</span>}
          {project.dueDate && <span className="flex items-center gap-1"><Clock size={12} /> Due: {project.dueDate}</span>}
        </div>
      </div>
    </div>
  );
}
