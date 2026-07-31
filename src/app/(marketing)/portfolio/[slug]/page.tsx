import { notFound } from "next/navigation";

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioSlugPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  // Static portfolio items for demo
  const items: Record<string, { title: string; description: string; tech: string[] }> = {
    "skuif-cut-grootman": {
      title: "Skuif-Cut Grootman",
      description: "A full-service barbershop booking platform built for Skuif-Cut Grootman, featuring online appointment scheduling, SMS reminders via Twilio integration, and a modern digital presence. The platform streamlines client bookings, reduces no-shows with automated notifications, and showcases the barbershop's brand identity through a clean, mobile-first design.",
      tech: ["Next.js", "TypeScript", "LibSQL", "Drizzle ORM", "Twilio", "TailwindCSS"],
    },
    "otto-construction": {
      title: "OTTO Construction Works",
      description: "A professional construction company website for OTTO Construction Works (est. 2026), a registered South African firm led by Lee Roy Jacobs and Stacey Lee Jacobs. The site showcases their full range of services including bricklaying, plaster work, tiling, electrical services, cleaning, and passive fire protection — with a clean, trust-focused design and prominent quote request features.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    "jmg-healthcare": {
      title: "JMG Healthcare Services",
      description: "A healthcare services platform for JMG Healthcare Services, a South African provider co-founded by J. George and J. Jacobs. The site connects qualified registered healthcare professionals with patients and facilities nationwide — offering professional nursing, elderly care, disability support, palliative care, medical staffing, and 24/7 medical transportation across the country.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    "ascension-codex": {
      title: "Ascension Codex",
      description: "An AI-powered knowledge platform featuring multi-model LLM orchestration with Anthropic and Google Gemini integration. Built with a full-stack architecture including Radix UI components, Three.js 3D visualisations, and real-time collaboration. The platform leverages Drizzle ORM with Neon Postgres for scalable data persistence and includes comprehensive audit tooling.",
      tech: ["Next.js", "TypeScript", "Express", "Three.js", "Gemini AI", "Anthropic", "Drizzle ORM", "Neon Postgres"],
    },
    "fx-analyzer": {
      title: "FX Analyzer Pro",
      description: "An institutional-grade algorithmic FX trading terminal powered by Google Gemini AI with a Mixture of Experts architecture. Four specialised LLM agents (Technical, Fundamental, Sentiment, Risk) analyse forex markets in real-time, debate their findings via the MM-DREX architecture, and deliver high-conviction trading signals directly to MetaTrader 5 through a ZeroMQ bridge.",
      tech: ["Next.js 16", "TypeScript", "Python", "Gemini AI", "ZeroMQ", "Socket.IO", "TailwindCSS 4", "Three.js", "MetaTrader 5"],
    },
  };

  const item = items[slug];
  if (!item) notFound();

  return <ClientPortfolioDetail slug={slug} item={item} />;
}

function ClientPortfolioDetail({ slug, item }: { slug: string; item: { title: string; description: string; tech: string[] } }) {
  // We need a client component for the design, but since we can't use "use client" in an async server component
  // Let's just return a server-rendered detail page
  const { title, description, tech } = item;

  return (
    <div className="min-h-screen bg-bl-deep pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <a href="/portfolio" className="inline-flex items-center gap-2 text-sm text-bl-ice/40 hover:text-bl-gold mb-8 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Portfolio
        </a>

        <div className="spatial-panel p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="text-[10px] text-bl-gold/60 uppercase tracking-widest mb-4">Case Study</div>
          <h1 className="text-3xl md:text-4xl font-bold text-bl-ice mb-6">{title}</h1>
          <p className="text-sm text-bl-ice/60 leading-relaxed mb-8">{description}</p>

          <div className="border-t border-white/5 pt-6">
            <h3 className="text-xs text-bl-ice/30 uppercase tracking-wider mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {tech.map((t: string) => (
                <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-bl-ice/60 tracking-wider uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
