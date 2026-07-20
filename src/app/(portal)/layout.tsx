"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Receipt, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

const portalLinks = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/projects", label: "Projects", icon: FileText },
  { href: "/portal/invoices", label: "Invoices", icon: Receipt },
];

function PortalSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed top-4 left-4 z-50 md:hidden p-2 bg-bl-deep/80 border border-white/10 rounded-xl text-bl-ice">
        <Menu size={18} />
      </button>
      {open && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed left-0 top-0 h-full z-40 w-60 bg-bl-deep/95 backdrop-blur-2xl border-r border-white/5 transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-bl-gold rounded flex items-center justify-center"><span className="text-bl-deep font-bold text-xs">B</span></div>
            <span className="text-xs font-mono tracking-wider text-bl-ice">Portal</span>
          </Link>
          <button onClick={() => setOpen(false)} className="md:hidden text-bl-ice/40"><X size={16} /></button>
        </div>
        <nav className="p-3 space-y-1">
          {portalLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all ${pathname === link.href ? "bg-bl-gold/15 text-bl-gold border border-bl-gold/20" : "text-bl-ice/40 hover:text-bl-ice hover:bg-white/5"}`}>
                <Icon size={16} /> <span className="tracking-wider uppercase">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-red-400/60 hover:text-red-400 transition-all"><LogOut size={16} /> <span className="tracking-wider uppercase">Sign Out</span></Link>
        </div>
      </aside>
    </>
  );
}

function PortalInner({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  if (status === "loading") return <div className="min-h-screen bg-bl-deep flex items-center justify-center"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-bl-deep">
      <PortalSidebar />
      <main className="md:ml-60 p-6 md:p-10 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider><PortalInner>{children}</PortalInner></SessionProvider>;
}
