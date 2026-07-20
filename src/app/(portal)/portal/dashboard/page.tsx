"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Receipt, Activity } from "lucide-react";

export default function PortalDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/portal");
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center pt-20"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bl-ice">Client Portal</h1>
        <p className="text-sm text-bl-ice/40 mt-1">Welcome, {session?.user?.name || "Client"}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active Projects", value: "2", icon: FileText, color: "#B59A5F" },
          { label: "Open Invoices", value: "1", icon: Receipt, color: "#00CCFF" },
          { label: "Recent Activity", value: "3 updates", icon: Activity, color: "#D7FF00" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="spatial-panel p-5 rounded-2xl border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}><Icon size={18} /></div>
              </div>
              <div className="text-2xl font-bold text-bl-ice">{stat.value}</div>
              <div className="text-xs text-bl-ice/40">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="spatial-panel p-6 rounded-2xl border border-white/5">
        <h2 className="text-sm font-semibold text-bl-ice uppercase tracking-wider mb-4">Recent Updates</h2>
        <div className="text-sm text-bl-ice/40 text-center py-8">No recent updates to display</div>
      </div>
    </div>
  );
}
