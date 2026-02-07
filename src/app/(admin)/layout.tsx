"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { supabase, type Profile, type UserRole } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/admin/dashboard" },
  { icon: Users, label: "Clients", href: "/admin/clients" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: Users, label: "Leads", href: "/admin/admin/leads" },
  { icon: Shield, label: "Team", href: "/admin/team" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile || (profile.role !== "admin" && profile.role !== "superadmin")) {
        router.push("/portal/dashboard");
        return;
      }

      setProfile(profile);
      setIsLoading(false);
    }

    loadProfile();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--onyx)] flex items-center justify-center">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[var(--card)] border-r border-[var(--border)] transform transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-[var(--border)]">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--siren-red)] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[var(--onyx)]" />
            </div>
            <div>
              <span className="font-mono text-sm tracking-wider uppercase block">Admin</span>
              <span className="text-xs text-[var(--spectral-muted)]">Blacklight Control</span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--spectral-dim)] hover:text-[var(--spectral-white)] hover:bg-[var(--onyx)] transition-colors rounded-none border border-transparent hover:border-[var(--border)] group"
            >
              <item.icon className="w-4 h-4 group-hover:text-[var(--signal-lime)]" />
              {item.label}
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 bg-[var(--border)] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[var(--signal-lime)]" />
            </div>
            <div>
              <p className="text-sm font-medium">{profile?.full_name || "Admin"}</p>
              <p className="text-xs text-[var(--spectral-muted)] font-mono uppercase">{profile?.role}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--siren-red)] hover:bg-[var(--siren-red)]/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-[var(--border)] bg-[var(--card)] flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 border border-[var(--border)]"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-[var(--spectral-dim)] hover:text-[var(--spectral-white)] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--siren-red)] rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
