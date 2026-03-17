# Layouts (shared shells + navigation)

This file includes full source for layout components that frame multiple pages.

## `src/app/layout.tsx` (RootLayout)
```tsx
import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Inter,
  Raleway,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Blacklight Web Designs | Revealing Brilliance",
  description:
    "Elite web design for disruptive tech startups and luxury technical brands. Bespoke, high-performance digital experiences from South Africa.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://blacklightwebdesigns.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} ${raleway.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {children}
      </body>
    </html>
  );
}
```

## `src/app/(admin)/layout.tsx` (AdminLayout)
```tsx
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
import { supabase, type Profile } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/ui/notification-center";

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
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
          <div className="flex items-center gap-4">
            <NotificationCenter userId={profile?.id || ""} />
            <div className="text-right">
              <p className="text-sm font-medium">{profile?.full_name}</p>
              <p className="text-xs text-[var(--spectral-muted)]">{profile?.role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-[var(--border)] rounded-none"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
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
```

## `src/app/(portal)/layout.tsx` (PortalLayout)
```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { supabase, type Profile } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/portal/portal/dashboard" },
  { icon: FileText, label: "Projects", href: "/portal/projects" },
  { icon: MessageSquare, label: "Messages", href: "/portal/messages" },
  { icon: Settings, label: "Settings", href: "/portal/settings" },
];

export default function PortalLayout({
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
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--card)] border-r border-[var(--border)] transform transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
              <span className="text-[var(--onyx)] font-bold text-lg">B</span>
            </div>
            <span className="font-mono text-sm tracking-wider uppercase">Portal</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--spectral-dim)] hover:text-[var(--spectral-white)] hover:bg-[var(--onyx)] transition-colors rounded-none border border-transparent hover:border-[var(--border)]"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)]">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--siren-red)] hover:bg-[var(--siren-red)]/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
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
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--signal-lime)] rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
              <div className="w-8 h-8 bg-[var(--border)] flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{profile?.full_name || "Client"}</p>
                <p className="text-xs text-[var(--spectral-muted)]">
                  {profile?.company_name || profile?.email}
                </p>
              </div>
            </div>
          </div>
        </header>

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
```

## `src/components/marketing/navigation.tsx` (Marketing Navigation)
```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, TrendingUp, ShoppingBag, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const serviceTiers = [
  { href: "/services/spark", label: "Spark", icon: Zap, color: "#D7FF00", price: "R3,500" },
  { href: "/services/growth", label: "Growth", icon: TrendingUp, color: "#00CCFF", price: "R8,500" },
  { href: "/services/shop", label: "Shop", icon: ShoppingBag, color: "#FF003C", price: "R18,500" },
  { href: "/contact", label: "Diagnostic", icon: Stethoscope, color: "#FF8800", price: "R1,500" },
];

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent"
            : "border-b border-[var(--border)] bg-[var(--onyx)]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center"
              >
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </motion.div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block group-hover:text-[var(--signal-lime)] transition-colors">
                Blacklight
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}

              <Button
                size="sm"
                className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono text-xs uppercase tracking-wider rounded-none"
                asChild
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-[var(--border)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--onyx)] border-b border-[var(--border)] md:hidden"
          >
            <div className="p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-lg font-mono uppercase tracking-wider text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] hover:bg-[var(--card)] transition-colors border border-[var(--border)]"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-[var(--border)] pt-4 mt-4">
                <p className="text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-wider mb-3 px-4">
                  Service Tiers
                </p>
                {serviceTiers.map((tier) => (
                  <Link
                    key={tier.label}
                    href={tier.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-4 hover:bg-[var(--card)] transition-colors border border-[var(--border)] mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <tier.icon className="w-4 h-4" style={{ color: tier.color }} />
                      <span className="font-mono text-sm">{tier.label}</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--spectral-muted)]">{tier.price}</span>
                  </Link>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none mt-4"
                asChild
              >
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

## `src/components/marketing/footer.tsx` (Marketing Footer)
```tsx
"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--onyx)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--signal-lime)] flex items-center justify-center">
                <span className="text-[var(--onyx)] font-bold text-lg">B</span>
              </div>
              <span className="font-mono text-sm tracking-wider uppercase hidden sm:block">Blacklight</span>
            </Link>
            <p className="text-sm text-[var(--spectral-dim)] leading-relaxed">
              Agentic web systems for the next generation of South African entrepreneurs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-6 text-[var(--spectral-white)]">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">All Services</Link></li>
              <li><Link href="/pricing" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Pricing</Link></li>
              <li><Link href="/services/whatsapp-ai" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">WhatsApp AI</Link></li>
              <li><Link href="/services/geo-landing" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Discovery Node</Link></li>
              <li><Link href="/services/orchestrator" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">The Orchestrator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-6 text-[var(--spectral-white)]">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/portfolio" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Contact</Link></li>
              <li><Link href="/portal" className="text-sm text-[var(--spectral-dim)] hover:text-[var(--signal-lime)] transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-6 text-[var(--spectral-white)]">Stay Synchronised</h4>
            <p className="text-sm text-[var(--spectral-dim)] mb-6">
              Join our signal network for updates on AI trends and digital strategy.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--spectral-dim)]">
            &copy; {currentYear} Blacklight Web Designs. Built in South Africa.
          </p>
          <div className="flex gap-8 text-xs text-[var(--spectral-dim)]">
            <Link href="/privacy" className="hover:text-[var(--spectral-white)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--spectral-white)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
