"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Calendar,
  Layers,
  Search,
  Clock,
} from "lucide-react";

interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  tier: "spark" | "growth" | "shop" | "diagnostic";
  status: "planning" | "in_progress" | "review" | "completed" | "cancelled";
  progress: number;
  budget?: number;
  startDate?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  planning: { label: "Planning", color: "text-bl-amber", bg: "bg-bl-amber/10", border: "border-bl-amber/20" },
  in_progress: { label: "In Progress", color: "text-bl-cyan", bg: "bg-bl-cyan/10", border: "border-bl-cyan/20" },
  review: { label: "Review", color: "text-bl-gold", bg: "bg-bl-gold/10", border: "border-bl-gold/20" },
  completed: { label: "Completed", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
};

const tierConfig = {
  spark: { label: "Spark", desc: "Starter package" },
  growth: { label: "Growth", desc: "Scaling solution" },
  shop: { label: "Shop", desc: "E-commerce" },
  diagnostic: { label: "Diagnostic", desc: "Audit & analysis" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  // Create form state
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    tier: "spark" as Project["tier"],
    budget: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
      setIsLoading(false);
    }
    loadProjects();
  }, []);

  const handleCreate = async () => {
    if (!newProject.name.trim()) return;
    setIsCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProject.name,
          description: newProject.description,
          tier: newProject.tier,
          budget: newProject.budget ? Number(newProject.budget) : undefined,
        }),
      });
      const project = await res.json();
      setProjects([project, ...projects]);
      setShowCreateDialog(false);
      setNewProject({ name: "", description: "", tier: "spark", budget: "" });
    } catch (e) {
      console.error("Failed to create project", e);
    }
    setIsCreating(false);
  };

  const updateProjectStatus = (projectId: string, newStatus: Project["status"]) => {
    setProjects(projects.map((p) =>
      p.id === projectId ? { ...p, status: newStatus } : p
    ));
  };

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bl-ice">Projects</h1>
          <p className="text-sm text-bl-ice/40 mt-1">
            {projects.length} total &bull; {projects.filter((p) => p.status === "in_progress").length} active
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-bl-gold/15 text-bl-gold rounded-xl text-xs font-semibold uppercase tracking-wider border border-bl-gold/20 hover:bg-bl-gold/25 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bl-ice/30" />
          <input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice focus:outline-none focus:border-bl-gold/40"
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="spatial-panel p-12 text-center">
            <Layers className="w-12 h-12 text-bl-gold/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-bl-ice mb-2">No projects found</h3>
            <p className="text-sm text-bl-ice/40 mb-4">
              {searchQuery ? "Try adjusting your search" : "Create your first project to get started"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateDialog(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-bl-gold/15 text-bl-gold rounded-xl text-xs font-semibold uppercase tracking-wider border border-bl-gold/20 hover:bg-bl-gold/25 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Project
              </button>
            )}
          </div>
        ) : (
          filteredProjects.map((project) => {
            const status = statusConfig[project.status];
            const tier = tierConfig[project.tier];
            return (
              <div key={project.id} className="spatial-panel p-5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-sm font-semibold text-bl-ice">{project.name}</h3>
                      <span className="text-[10px] text-bl-ice/30 font-mono px-1.5 py-0.5 bg-white/5 rounded">
                        {tier.label}
                      </span>
                    </div>
                    {project.description && (
                      <p className="text-xs text-bl-ice/50">{project.description}</p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider shrink-0 ${status.bg} ${status.color} ${status.border} border`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] text-bl-ice/40 mb-1.5">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${project.progress}%`,
                        background:
                          project.status === "completed"
                            ? "linear-gradient(90deg, #CCFF00, #FF006E)"
                            : project.status === "cancelled"
                            ? "#6B7280"
                            : "linear-gradient(90deg, #CCFF00, #00F0FF)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-bl-ice/40">
                  {project.budget && (
                    <span className="flex items-center gap-1.5 text-bl-gold">
                      <span>R</span>
                      {project.budget.toLocaleString()}
                    </span>
                  )}
                  {project.dueDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                  {project.status === "planning" && (
                    <button
                      onClick={() => updateProjectStatus(project.id, "in_progress")}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider bg-bl-cyan/10 text-bl-cyan border border-bl-cyan/20 hover:bg-bl-cyan/20 transition-all"
                    >
                      Start Project
                    </button>
                  )}
                  {project.status === "in_progress" && (
                    <button
                      onClick={() => updateProjectStatus(project.id, "review")}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider bg-bl-gold/10 text-bl-gold border border-bl-gold/20 hover:bg-bl-gold/20 transition-all"
                    >
                      Send to Review
                    </button>
                  )}
                  {project.status === "review" && (
                    <button
                      onClick={() => updateProjectStatus(project.id, "completed")}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20 transition-all"
                    >
                      Mark Complete
                    </button>
                  )}
                  {project.status !== "completed" && project.status !== "cancelled" && (
                    <button
                      onClick={() => updateProjectStatus(project.id, "cancelled")}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all ml-auto"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateDialog(false)} />
          <div className="relative spatial-panel p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-bl-ice">New Project</h2>
              <button
                onClick={() => setShowCreateDialog(false)}
                className="text-bl-ice/40 hover:text-bl-ice transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-bl-ice/50 mb-1.5">Project Name *</label>
                <input
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="e.g. Blacklight Redesign"
                  className="w-full h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40"
                />
              </div>

              <div>
                <label className="block text-xs text-bl-ice/50 mb-1.5">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief project description..."
                  rows={3}
                  className="w-full px-4 py-3 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-bl-ice/50 mb-1.5">Tier</label>
                  <select
                    value={newProject.tier}
                    onChange={(e) => setNewProject({ ...newProject, tier: e.target.value as Project["tier"] })}
                    className="w-full h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice focus:outline-none focus:border-bl-gold/40"
                  >
                    <option value="spark">Spark</option>
                    <option value="growth">Growth</option>
                    <option value="shop">Shop</option>
                    <option value="diagnostic">Diagnostic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-bl-ice/50 mb-1.5">Budget (ZAR)</label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    placeholder="e.g. 50000"
                    className="w-full h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateDialog(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/10 text-bl-ice/60 hover:text-bl-ice hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!newProject.name.trim() || isCreating}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-bl-gold/15 text-bl-gold border border-bl-gold/20 hover:bg-bl-gold/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
