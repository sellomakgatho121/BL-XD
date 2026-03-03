"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Globe, Layout, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-onyx text-spectral-white selection:bg-signal-lime selection:text-onyx font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-spectral-white/10 bg-onyx/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-spectral-white/70">
            <Link href="/services" className="hover:text-signal-lime transition-colors">Services</Link>
            <Link href="/process" className="hover:text-signal-lime transition-colors">Process</Link>
            <Link href="/portfolio" className="hover:text-signal-lime transition-colors">Portfolio</Link>
            <Link href="/blog" className="hover:text-signal-lime transition-colors">Insights</Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 bg-signal-lime text-onyx font-bold rounded-sm hover:bg-signal-lime/90 transition-all flex items-center gap-2"
            >
              Start Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-signal-lime blur-[128px] rounded-full mix-blend-screen opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-siren-red blur-[128px] rounded-full mix-blend-screen opacity-20 animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-spectral-white/10 bg-spectral-white/5 text-xs font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
              AGENCY OS v2.0 ONLINE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
              Digital Architecture for <br/>
              <span className="text-signal-lime">Hyper-Scale Growth</span>
            </h1>
            
            <p className="text-xl text-spectral-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              We build high-performance web systems that combine aesthetic precision with agentic intelligence. Not just websites—digital assets that work while you sleep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-signal-lime text-onyx font-bold rounded-md hover:bg-signal-lime/90 transition-all flex items-center justify-center gap-2 group"
              >
                Launch Your Vision
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-8 py-4 border border-spectral-white/20 text-spectral-white font-medium rounded-md hover:bg-spectral-white/5 transition-all flex items-center justify-center gap-2"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-spectral-white/5 bg-onyx/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout className="text-signal-lime" />,
                title: "Strategic UX/UI",
                desc: "Interfaces designed for conversion and clarity, backed by behavioral psychology."
              },
              {
                icon: <Cpu className="text-blue-400" />,
                title: "Next.js Performance",
                desc: "Blazing fast load times with React Server Components and edge caching."
              },
              {
                icon: <Zap className="text-siren-red" />,
                title: "Agentic Systems",
                desc: "AI-powered automations that handle leads, support, and content while you rest."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-xl border border-spectral-white/10 bg-spectral-white/5 hover:border-signal-lime/30 transition-colors group"
              >
                <div className="mb-4 p-3 rounded-lg bg-onyx inline-block group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-spectral-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dev Mode Indicator (Visible only in dev) */}
      <div className="fixed bottom-4 right-4 z-50 px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs rounded-full font-mono">
        DEV_MODE: MAIN_SITE
      </div>
    </div>
  );
}
