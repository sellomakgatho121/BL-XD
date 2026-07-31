"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle } from "lucide-react";

const statusConfig: Record<string, { color: string; label: string }> = {
  planning: { color: "#CCFF00", label: "Planning" },
  in_progress: { color: "#00CCFF", label: "In Progress" },
  review: { color: "#D7FF00", label: "Review" },
  completed: { color: "#00FF88", label: "Completed" },
};

export default function PortalProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center pt-20"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-bl-ice mb-8">My Projects</h1>
      {projects.length === 0 ? (
        <div className="spatial-panel p-10 rounded-2xl border border-white/5 text-center">
          <FileText size={32} className="text-bl-ice/20 mx-auto mb-4" />
          <p className="text-sm text-bl-ice/40">No projects yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => {
            const cfg = statusConfig[p.status] || { color: "#666", label: p.status };
            return (
              <div key={p.id} className="spatial-panel p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-bl-ice">{p.name}</h3>
                    {p.description && <p className="text-xs text-bl-ice/40 mt-1">{p.description}</p>}
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full border" style={{ borderColor: `${cfg.color}30`, color: cfg.color, backgroundColor: `${cfg.color}10` }}>{cfg.label}</span>
                </div>
                {p.progress > 0 && (
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${p.progress}%`, backgroundColor: cfg.color }} />
                  </div>
                )}
                <div className="flex gap-4 mt-3 text-[10px] text-bl-ice/30">
                  {p.startDate && <span className="flex items-center gap-1"><Clock size={10} /> {p.startDate}</span>}
                  {p.dueDate && <span className="flex items-center gap-1"><CheckCircle size={10} /> Due {p.dueDate}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
