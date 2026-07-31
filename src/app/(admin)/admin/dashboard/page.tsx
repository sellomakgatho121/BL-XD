"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, FileText, Receipt, TrendingUp, Activity, Bell } from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<StatCard[]>([
    { label: "Total Leads", value: "0", change: "+0 this week", icon: Users, color: "#CCFF00" },
    { label: "Active Projects", value: "0", change: "0 in review", icon: FileText, color: "#00CCFF" },
    { label: "Invoices", value: "0", change: "0 overdue", icon: Receipt, color: "#FF006E" },
    { label: "Conversion Rate", value: "0%", change: "0% this month", icon: TrendingUp, color: "#00F0FF" },
  ]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, notifsRes] = await Promise.all([
          fetch("/api/contact"),
          fetch("/api/notifications"),
        ]);
        const leads = await leadsRes.json();
        const notifs = await notifsRes.json();
        setNotifications(notifs.slice(0, 5));

        setStats([
          { label: "Total Leads", value: String(leads.length), change: `${leads.filter((l: any) => l.status === "new").length} new`, icon: Users, color: "#CCFF00" },
          { label: "Active Projects", value: "3", change: "1 in review", icon: FileText, color: "#00CCFF" },
          { label: "Invoices", value: "5", change: "0 overdue", icon: Receipt, color: "#FF006E" },
          { label: "Conversion Rate", value: "28%", change: "+5% this month", icon: TrendingUp, color: "#00F0FF" },
        ]);
      } catch {}
    }
    fetchData();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bl-ice">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="text-sm text-bl-ice/40 mt-1">Here&apos;s your agency overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="spatial-panel p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon size={18} />
                </div>
                <Activity size={14} className="text-bl-ice/20" />
              </div>
              <div className="text-2xl font-bold text-bl-ice">{stat.value}</div>
              <div className="text-xs text-bl-ice/40 mt-1">{stat.label}</div>
              <div className="text-[10px] text-bl-ice/30 mt-1">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="spatial-panel p-6 rounded-2xl border border-white/5">
          <h2 className="text-sm font-semibold text-bl-ice uppercase tracking-wider mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-full bg-bl-gold/10 flex items-center justify-center">
                  <Users size={14} className="text-bl-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-bl-ice font-medium">New Lead #{i + 1}</div>
                  <div className="text-[10px] text-bl-ice/40 truncate">Contact form submission pending review</div>
                </div>
                <span className="text-[10px] text-bl-gold/60">New</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="spatial-panel p-6 rounded-2xl border border-white/5">
          <h2 className="text-sm font-semibold text-bl-ice uppercase tracking-wider mb-4">Notifications</h2>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-xs text-bl-ice/30 text-center py-8">No notifications yet</div>
            ) : (
              notifications.map((n: any) => (
                <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Bell size={14} className="text-bl-gold mt-0.5" />
                  <div>
                    <div className="text-xs text-bl-ice">{n.title}</div>
                    <div className="text-[10px] text-bl-ice/40">{n.message}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
