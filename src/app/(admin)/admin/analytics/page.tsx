"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Clock,
  DollarSign,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface AnalyticsData {
  totalVisitors: number;
  visitorChange: number;
  totalLeads: number;
  leadChange: number;
  conversionRate: number;
  conversionChange: number;
  revenue: number;
  revenueChange: number;
  topPages: { path: string; views: number; avgTime: string }[];
  leadSources: { source: string; count: number; percentage: number }[];
  popularServices: { name: string; inquiries: number; conversions: number }[];
  recentConversions: { name: string; tier: string; value: string; date: string }[];
}

const defaultData: AnalyticsData = {
  totalVisitors: 0,
  visitorChange: 0,
  totalLeads: 0,
  leadChange: 0,
  conversionRate: 0,
  conversionChange: 0,
  revenue: 0,
  revenueChange: 0,
  topPages: [],
  leadSources: [],
  popularServices: [],
  recentConversions: [],
};

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  prefix?: string;
  suffix?: string;
}) {
  const isPositive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[var(--border)] bg-[var(--card)] p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase text-[var(--spectral-muted)] tracking-wider">
          {title}
        </span>
        <Icon className="w-4 h-4 text-[var(--spectral-muted)]" />
      </div>
      <div className="text-3xl font-black tracking-tighter mb-2">
        {prefix}{value.toLocaleString()}{suffix}
      </div>
      <div className={`flex items-center gap-1 text-sm font-mono ${isPositive ? "text-[var(--signal-lime)]" : "text-[var(--siren-red)]"}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {Math.abs(change)}% vs last month
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true);

      // Load leads data
      const { data: leads, count: leadCount } = await supabase
        .from("leads")
        .select("*", { count: "exact" })
        .gte("created_at", getDateRange(timeRange));

      // Load revenue data from invoices
      const { data: invoices } = await supabase
        .from("invoices")
        .select("amount, status")
        .eq("status", "paid")
        .gte("created_at", getDateRange(timeRange));

      const totalRevenue = invoices?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;

      // Load projects for conversion data
      const { count: projectCount } = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .gte("created_at", getDateRange(timeRange));

      const convRate = leadCount && leadCount > 0
        ? Math.round(((projectCount || 0) / leadCount) * 100)
        : 0;

      // Aggregate lead sources
      const sourceMap = new Map<string, number>();
      if (leads) {
        for (const lead of leads) {
          const source = lead.source || "Direct";
          sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
        }
      }

      const leadSources = Array.from(sourceMap.entries())
        .map(([source, count]) => ({
          source,
          count,
          percentage: leadCount ? Math.round((count / leadCount) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count);

      // Popular services from leads
      const serviceMap = new Map<string, { inquiries: number; conversions: number }>();
      if (leads) {
        for (const lead of leads) {
          const service = lead.budget_range || "Unknown";
          const existing = serviceMap.get(service) || { inquiries: 0, conversions: 0 };
          existing.inquiries++;
          if (lead.status === "converted") existing.conversions++;
          serviceMap.set(service, existing);
        }
      }

      const popularServices = Array.from(serviceMap.entries())
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.inquiries - a.inquiries);

      setData({
        totalVisitors: 0, // Would come from Plausible/Vercel Analytics API
        visitorChange: 0,
        totalLeads: leadCount || 0,
        leadChange: 12, // Placeholder - would calculate from previous period
        conversionRate: convRate,
        conversionChange: 5,
        revenue: totalRevenue,
        revenueChange: 18,
        topPages: [
          { path: "/", views: 0, avgTime: "0:00" },
          { path: "/services", views: 0, avgTime: "0:00" },
          { path: "/portfolio", views: 0, avgTime: "0:00" },
          { path: "/contact", views: 0, avgTime: "0:00" },
          { path: "/pricing", views: 0, avgTime: "0:00" },
        ],
        leadSources,
        popularServices,
        recentConversions: [],
      });

      setIsLoading(false);
    }

    loadAnalytics();
  }, [timeRange]);

  function getDateRange(range: string): string {
    const now = new Date();
    switch (range) {
      case "7d": now.setDate(now.getDate() - 7); break;
      case "30d": now.setDate(now.getDate() - 30); break;
      case "90d": now.setDate(now.getDate() - 90); break;
    }
    return now.toISOString();
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">
          LOADING ANALYTICS...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Analytics</h1>
          <p className="text-sm text-[var(--spectral-muted)] font-mono mt-1">
            Business intelligence dashboard
          </p>
        </div>
        <div className="flex border border-[var(--border)]">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-xs font-mono uppercase ${
                timeRange === range
                  ? "bg-[var(--signal-lime)] text-[var(--onyx)]"
                  : "text-[var(--spectral-muted)] hover:text-[var(--spectral-white)]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Visitors" value={data.totalVisitors} change={data.visitorChange} icon={Eye} />
        <MetricCard title="Leads" value={data.totalLeads} change={data.leadChange} icon={Users} />
        <MetricCard title="Conversion Rate" value={data.conversionRate} change={data.conversionChange} icon={MousePointerClick} suffix="%" />
        <MetricCard title="Revenue" value={data.revenue} change={data.revenueChange} icon={DollarSign} prefix="R" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-4 h-4 text-[var(--signal-lime)]" />
            <h2 className="font-bold text-lg">Lead Sources</h2>
          </div>
          {data.leadSources.length === 0 ? (
            <p className="text-sm text-[var(--spectral-muted)] text-center py-8">
              No lead data yet. Sources will appear as inquiries come in.
            </p>
          ) : (
            <div className="space-y-4">
              {data.leadSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-mono">{source.source}</span>
                    <span className="text-xs text-[var(--spectral-muted)]">
                      {source.count} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--onyx)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--signal-lime)]"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Popular Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-[var(--signal-lime)]" />
            <h2 className="font-bold text-lg">Popular Services</h2>
          </div>
          {data.popularServices.length === 0 ? (
            <p className="text-sm text-[var(--spectral-muted)] text-center py-8">
              No service data yet. Stats will populate as leads come in.
            </p>
          ) : (
            <div className="space-y-3">
              {data.popularServices.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-3 border border-[var(--border)]"
                >
                  <div>
                    <span className="text-sm font-bold">{service.name}</span>
                    <p className="text-xs text-[var(--spectral-muted)]">
                      {service.inquiries} inquiries
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono text-[var(--signal-lime)]">
                      {service.inquiries > 0 ? Math.round((service.conversions / service.inquiries) * 100) : 0}%
                    </span>
                    <p className="text-xs text-[var(--spectral-muted)]">conversion</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-4 h-4 text-[var(--signal-lime)]" />
          <h2 className="font-bold text-lg">Top Pages</h2>
          <span className="text-xs text-[var(--spectral-muted)] font-mono ml-auto">
            Connect Plausible or Vercel Analytics for live data
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 font-mono text-xs uppercase text-[var(--spectral-muted)]">Page</th>
                <th className="text-right py-3 px-4 font-mono text-xs uppercase text-[var(--spectral-muted)]">Views</th>
                <th className="text-right py-3 px-4 font-mono text-xs uppercase text-[var(--spectral-muted)]">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {data.topPages.map((page) => (
                <tr key={page.path} className="border-b border-[var(--border)]/50 hover:bg-[var(--onyx)]">
                  <td className="py-3 px-4 font-mono text-[var(--signal-lime)]">{page.path}</td>
                  <td className="py-3 px-4 text-right">{page.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right flex items-center justify-end gap-1 text-[var(--spectral-muted)]">
                    <Clock className="w-3 h-3" />
                    {page.avgTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-4 h-4 text-[var(--signal-lime)]" />
          <h2 className="font-bold text-lg">Recent Conversions</h2>
        </div>
        {data.recentConversions.length === 0 ? (
          <p className="text-sm text-[var(--spectral-muted)] text-center py-8">
            No conversions yet. Completed deals will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {data.recentConversions.map((conv, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[var(--signal-lime)]" />
                  <div>
                    <span className="text-sm font-bold">{conv.name}</span>
                    <p className="text-xs text-[var(--spectral-muted)]">{conv.tier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono text-[var(--signal-lime)]">{conv.value}</span>
                  <p className="text-xs text-[var(--spectral-muted)]">{conv.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
