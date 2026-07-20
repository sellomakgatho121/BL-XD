import { notFound } from "next/navigation";

interface PortfolioPageProps {
  params: { slug: string };
}

export default async function PortfolioSlugPage({ params }: PortfolioPageProps) {
  // Static portfolio items for demo
  const items: Record<string, { title: string; description: string; tech: string[] }> = {
    "nexus-ai-platform": {
      title: "Nexus AI Platform",
      description: "An intelligent business process automation platform built with Next.js, integrating real-time data processing, AI-driven analytics, and a sophisticated multi-tenant architecture.",
      tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Redis", "Docker"],
    },
    "quantum-commerce": {
      title: "Quantum Commerce Engine",
      description: "A high-performance e-commerce solution with real-time inventory management, AI-powered recommendations, and a seamless checkout experience handling 10,000+ concurrent users.",
      tech: ["Next.js", "Node.js", "GraphQL", "Redis", "AWS", "Stripe"],
    },
    "sentinel-analytics": {
      title: "Sentinel Analytics",
      description: "Enterprise security analytics dashboard processing millions of events per second with real-time threat detection, custom alerting, and interactive data visualization.",
      tech: ["React", "Python", "Apache Kafka", "Elasticsearch", "D3.js", "Docker"],
    },
    "aura-design-system": {
      title: "Aura Design System",
      description: "A comprehensive design system powering consistent user experiences across 12 products, featuring 200+ components, automated accessibility testing, and intelligent theme generation.",
      tech: ["React", "TypeScript", "Storybook", "Figma API", "Chromatic", "AWS"],
    },
    "pulse-engagement": {
      title: "Pulse Engagement Platform",
      description: "Real-time user engagement analytics with behavioral tracking, cohort analysis, and automated campaign optimization powered by machine learning algorithms.",
      tech: ["Next.js", "Python", "ClickHouse", "RabbitMQ", "Kubernetes", "MLflow"],
    },
    "terra-logistics": {
      title: "Terra Logistics OS",
      description: "Complete logistics management operating system with route optimization, fleet tracking, real-time delivery updates, and predictive maintenance scheduling.",
      tech: ["React Native", "Go", "PostgreSQL", "MongoDB", "Redis", "Google Maps"],
    },
  };

  const item = items[params.slug];
  if (!item) notFound();

  return <ClientPortfolioDetail slug={params.slug} item={item} />;
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
