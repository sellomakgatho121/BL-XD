"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Folder,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { supabase, type Profile } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  status: "planning" | "in_progress" | "review" | "completed";
  progress: number;
  due_date: string;
  tier: string;
}

const statusConfig = {
  planning: { icon: Clock, color: "text-[var(--spectral-muted)]", bg: "bg-[var(--spectral-muted)]/10" },
  in_progress: { icon: Zap, color: "text-[var(--signal-lime)]", bg: "bg-[var(--signal-lime)]/10" },
  review: { icon: AlertCircle, color: "text-[var(--electric-purple)]", bg: "bg-[var(--electric-purple)]/10" },
  completed: { icon: CheckCircle2, color: "text-[var(--success)]", bg: "bg-[var(--success)]/10" },
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profileData);

        // Mock projects for now - would fetch from projects table
        setProjects([
          {
            id: "1",
            name: "E-commerce Platform",
            status: "in_progress",
            progress: 65,
            due_date: "2026-03-15",
            tier: "Shop Tier",
          },
        ]);
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-black tracking-tighter mb-2">
          Welcome back, {profile?.full_name?.split(" ")[0] || "Client"}
        </h1>
        <p className="text-[var(--spectral-dim)]">
          Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: projects.length.toString(), icon: Folder },
          { label: "Messages", value: "3", icon: MessageSquare },
          { label: "Completed", value: "0", icon: CheckCircle2 },
          { label: "Next Review", value: "2 days", icon: Clock },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <stat.icon className="w-5 h-5 text-[var(--signal-lime)] mb-4" />
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-sm text-[var(--spectral-muted)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Active Projects</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[var(--signal-lime)] text-[var(--signal-lime)] hover:bg-[var(--signal-lime)]/10 rounded-none"
            asChild
          >
            <Link href="/portal/projects">
              View All
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="border border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <Folder className="w-12 h-12 text-[var(--spectral-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">No active projects</h3>
            <p className="text-[var(--spectral-dim)] mb-6">
              Start your first project by exploring our services.
            </p>
            <Button
              className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none"
              asChild
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => {
              const status = statusConfig[project.status];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--signal-lime)]/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{project.name}</h3>
                      <p className="text-sm text-[var(--spectral-muted)]">{project.tier}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 ${status.bg}`}>
                      <status.icon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-xs font-mono uppercase ${status.color}`}>
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--spectral-dim)]">Progress</span>
                      <span className="font-mono">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-[var(--border)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[var(--signal-lime)]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                    <span className="text-sm text-[var(--spectral-muted)]">
                      Due: {new Date(project.due_date).toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--signal-lime)] hover:text-[var(--signal-lime)] hover:bg-[var(--signal-lime)]/10"
                      asChild
                    >
                      <Link href={`/portal/projects/${project.id}`}>
                        View Details
                        <ArrowUpRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
