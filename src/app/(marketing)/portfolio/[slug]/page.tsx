import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Code, Layout, Globe, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import Navigation from "@/components/marketing/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LivePlayground from "@/components/portfolio/LivePlayground";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PortfolioItem {
  slug: string;
  title: string;
  client_name: string;
  service_tier: string;
  description: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  testimonial: { quote: string; author: string; role: string } | null;
  hero_image: string | null;
  tech_stack: string[];
  published: boolean;
}

async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data as PortfolioItem;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  
  if (!item) return pageMetadata.portfolio();
  
  return pageMetadata.projectDetail(
    item.title,
    item.description || `Case study for ${item.client_name}`
  );
}

export default async function PortfolioItemPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <GrainOverlay opacity={0.03} />
      <Scanlines />
      <Navigation />

      <article className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/portfolio"
            className="inline-flex items-center text-sm text-[var(--spectral-muted)] hover:text-[var(--signal-lime)] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>

          <header className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
            <div>
              <div className="flex gap-2 mb-6">
                <Badge className="bg-[var(--signal-lime)] text-[var(--onyx)] rounded-none border-none uppercase tracking-wider font-mono">
                  {item.service_tier}
                </Badge>
                {item.client_name && (
                  <Badge variant="outline" className="text-[var(--spectral-dim)] border-[var(--border)] rounded-none uppercase tracking-wider font-mono">
                    {item.client_name}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                {item.title}
              </h1>

              <p className="text-xl text-[var(--spectral-dim)] max-w-xl">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
               {item.tech_stack && item.tech_stack.map(tech => (
                 <span key={tech} className="px-3 py-1 border border-[var(--border)] text-xs font-mono text-[var(--spectral-muted)] uppercase tracking-wider">
                   {tech}
                 </span>
               ))}
            </div>
          </header>

          {item.hero_image && (
            <div className="relative w-full aspect-video mb-20 border border-[var(--border)] overflow-hidden bg-[var(--card)]">
               {/* Image placeholder logic since we don't have actual images yet */}
               <div className="absolute inset-0 bg-[var(--signal-lime)]/5 flex items-center justify-center">
                 <span className="font-mono text-[var(--signal-lime)] opacity-50">HERO IMAGE: {item.title}</span>
               </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-24">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--signal-lime)] text-[var(--onyx)] flex items-center justify-center font-mono text-sm">01</div>
                  The Challenge
                </h2>
                <div className="prose prose-invert prose-lime max-w-none text-[var(--spectral-dim)]">
                  <p>{item.challenge}</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--signal-lime)] text-[var(--onyx)] flex items-center justify-center font-mono text-sm">02</div>
                  The Solution
                </h2>
                <div className="prose prose-invert prose-lime max-w-none text-[var(--spectral-dim)]">
                  <p>{item.solution}</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--signal-lime)] text-[var(--onyx)] flex items-center justify-center font-mono text-sm">03</div>
                  Live Component
                </h2>
                <div className="mb-6 text-[var(--spectral-dim)]">
                  <p>Interact with the actual design system components delivered in this project.</p>
                </div>
                <LivePlayground />
              </section>
            </div>

            <div className="space-y-12">
              <div className="bg-[var(--card)] border border-[var(--border)] p-8">
                <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--spectral-muted)] mb-6">Key Results</h3>
                <div className="space-y-8">
                  {item.results && item.results.map((result, i) => (
                    <div key={i}>
                      <div className="text-4xl font-black text-[var(--signal-lime)] mb-1">{result.value}</div>
                      <div className="text-sm text-[var(--spectral-dim)]">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {item.testimonial && (
                <div className="relative">
                  <MessageCircle className="w-8 h-8 text-[var(--signal-lime)] mb-4 opacity-50" />
                  <blockquote className="text-lg italic text-[var(--spectral-white)] mb-4">
                    "{item.testimonial.quote}"
                  </blockquote>
                  <cite className="not-italic block text-sm text-[var(--spectral-dim)]">
                    <strong className="text-[var(--spectral-white)] block">{item.testimonial.author}</strong>
                    {item.testimonial.role}
                  </cite>
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-[var(--border)] flex justify-between items-center">
            <div className="text-sm text-[var(--spectral-dim)]">
              Interested in similar results?
            </div>
            <Button asChild className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 font-mono uppercase tracking-wider rounded-none">
              <Link href="/contact">Start Project</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
