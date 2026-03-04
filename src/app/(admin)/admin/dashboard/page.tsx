"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { supabase, type Profile } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface Stats {
  totalClients: number;
  activeProjects: number;
  monthlyRevenue: number;
  pendingMessages: number;
}

const recentActivity = [
  { action: "New project created", client: "TechFlow SA", time: "2 hours ago", type: "project" },
  { action: "Payment received", client: "Kinetic Coffee", time: "4 hours ago", type: "payment" },
  { action: "Message received", client: "Sarah Chen", time: "6 hours ago", type: "message" },
  { action: "Project completed", client: "Urban Edge", time: "1 day ago", type: "completed" },
];

export default function AdminDashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    pendingMessages: 0,
  });
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

        // Fetch stats (mock for now)
        const { count: clientCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .eq("role", "client");

        setStats({
          totalClients: clientCount || 0,
          activeProjects: 12,
          monthlyRevenue: 48500,
          pendingMessages: 3,
        });
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
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-black tracking-tighter mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[var(--spectral-dim)]">
          Welcome back, {profile?.full_name || "Admin"}. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Clients",
            value: stats.totalClients.toString(),
            change: "+12%",
            trend: "up",
            icon: Users,
          },
          {
            label: "Active Projects",
            value: stats.activeProjects.toString(),
            change: "+5%",
            trend: "up",
            icon: FolderKanban,
          },
          {
            label: "Monthly Revenue",
            value: `R${stats.monthlyRevenue.toLocaleString()}`,
            change: "+18%",
            trend: "up",
            icon: DollarSign,
          },
          {
            label: "Pending Messages",
            value: stats.pendingMessages.toString(),
            change: "-2",
            trend: "down",
            icon: MessageSquare,
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon className="w-5 h-5 text-[var(--signal-lime)]" />
              <div className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-[var(--signal-lime)]" : "text-[var(--siren-red)]"}`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-sm text-[var(--spectral-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div
          className="border border-[var(--border)] bg-[var(--card)]"
        >
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Activity className="w-5 h-5 text-[var(--spectral-muted)]" />
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-[var(--onyx)] transition-colors">
                <div className={`w-8 h-8 flex items-center justify-center ${
                  activity.type === "project" ? "bg-[var(--electric-purple)]/10" :
                  activity.type === "payment" ? "bg-[var(--signal-lime)]/10" :
                  activity.type === "completed" ? "bg-[var(--success)]/10" :
                  "bg-[var(--spectral-muted)]/10"
                }`}>
                  {activity.type === "project" ? <FolderKanban className="w-4 h-4 text-[var(--electric-purple)]" /> :
                   activity.type === "payment" ? <DollarSign className="w-4 h-4 text-[var(--signal-lime)]" /> :
                   activity.type === "completed" ? <CheckCircle2 className="w-4 h-4 text-[var(--success)]" /> :
                   <MessageSquare className="w-4 h-4 text-[var(--spectral-muted)]" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-[var(--spectral-muted)]">{activity.client}</p>
                </div>
                <span className="text-xs text-[var(--spectral-muted)] font-mono">{activity.time}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[var(--border)]">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-[var(--spectral-muted)] hover:text-[var(--spectral-white)]"
            >
              View All Activity
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="border border-[var(--border)] bg-[var(--card)]"
        >
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-lg font-bold">Quick Actions</h2>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-4">
            <Button
              className="h-auto py-6 bg-[var(--signal-lime)]/10 text-[var(--signal-lime)] hover:bg-[var(--signal-lime)]/20 border border-[var(--signal-lime)]/50 rounded-none flex flex-col items-center gap-2"
              asChild
            >
              <Link href="/admin/clients/new">
                <Users className="w-6 h-6" />
                <span className="font-mono text-xs uppercase">New Client</span>
              </Link>
            </Button>
            <Button
              className="h-auto py-6 bg-[var(--electric-purple)]/10 text-[var(--electric-purple)] hover:bg-[var(--electric-purple)]/20 border border-[var(--electric-purple)]/50 rounded-none flex flex-col items-center gap-2"
              asChild
            >
              <Link href="/admin/projects/new">
                <FolderKanban className="w-6 h-6" />
                <span className="font-mono text-xs uppercase">New Project</span>
              </Link>
            </Button>
            <Button
              className="h-auto py-6 bg-[var(--spectral-white)]/10 text-[var(--spectral-white)] hover:bg-[var(--spectral-white)]/20 border border-[var(--spectral-white)]/50 rounded-none flex flex-col items-center gap-2"
              asChild
            >
              <Link href="/admin/invoices">
                <DollarSign className="w-6 h-6" />
                <span className="font-mono text-xs uppercase">Create Invoice</span>
              </Link>
            </Button>
            <Button
              className="h-auto py-6 bg-[var(--siren-red)]/10 text-[var(--siren-red)] hover:bg-[var(--siren-red)]/20 border border-[var(--siren-red)]/50 rounded-none flex flex-col items-center gap-2"
            >
              <AlertCircle className="w-6 h-6" />
              <span className="font-mono text-xs uppercase">View Alerts</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
