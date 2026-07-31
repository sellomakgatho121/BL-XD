"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag, Layers, Sparkles, BookOpen } from "lucide-react";
import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";

const categories = ["All", "Engineering", "Design", "AI", "Performance"];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((post: any) => post.category === activeFilter);

  const featuredPost = filteredPosts[0];

  return (
    <div className="min-h-screen bg-bl-deep text-bl-text">
      {/* Isometric grid overlay */}
      <div className="fixed inset-0 iso-grid pointer-events-none z-0" />

      {/* Ambient glow */}
      <div className="fixed top-1/4 right-[10%] w-96 h-96 rounded-full bg-bl-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-[8%] w-64 h-64 rounded-full bg-bl-cyan/4 blur-[80px] pointer-events-none z-0" />

      <Navigation />

      {/* ═══════════════════════════════════════
         HERO — THE CHRONICLE
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-16 px-6 scene-3d">
        <div className="max-w-6xl mx-auto text-center preserve-3d">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-xs font-semibold uppercase tracking-widest mb-8">
            <BookOpen size={14} />
            The Chronicle
          </div>

          <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.85] tracking-tighter uppercase mb-6 gold-glow">
            <span className="block">Depth</span>
            <span className="gold-gradient">Dispatch</span>
          </h1>

          <p className="text-lg md:text-xl text-bl-text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Engineering perspectives on web performance, AI, design systems,
            and the future of digital experiences — delivered straight from the depths.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Weekly Insights", "Deep Technical", "No Fluff", "AI-Ready"].map((f) => (
              <span
                key={f}
                className="px-4 py-2 rounded-full bg-bl-glass border border-bl-glass-border text-bl-text-muted text-xs font-medium uppercase tracking-wider"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         FILTER BAR
         ═══════════════════════════════════════ */}
      <section className="relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-bl-gold text-bl-deep shadow-[0_0_20px_rgba(181,154,95,0.2)]"
                    : "bg-bl-glass border border-bl-glass-border text-bl-text-muted hover:text-bl-gold hover:border-bl-gold/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         FEATURED POST (if any)
         ═══════════════════════════════════════ */}
      {filteredPosts.length > 0 && (
        <section className="relative z-10 px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group tilt-card block"
            >
              <div className="spatial-panel p-8 md:p-12 rim-light spatial-panel-gold relative overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-bl-gold/8 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-bl-gold/5 blur-[100px] pointer-events-none" />

                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bl-gold/15 border border-bl-gold/30 text-bl-gold text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles size={10} />
                      Featured
                    </span>
                    {featuredPost.category && (
                      <span className="px-3 py-1 rounded-full bg-bl-glass border border-bl-glass-border text-bl-text-muted text-[10px] font-medium uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold uppercase mb-4 font-display group-hover:text-bl-gold transition-colors tracking-tighter">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="text-bl-text-muted text-sm md:text-base leading-relaxed mb-6 max-w-3xl line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs text-bl-text-muted mb-8">
                    {featuredPost.publishedAt && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Calendar size={12} /> {new Date(featuredPost.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                    {featuredPost.readTime && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Clock size={12} /> {featuredPost.readTime} min read
                      </span>
                    )}
                    {featuredPost.tags?.length > 0 && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Tag size={12} /> {featuredPost.tags.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-bl-gold text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                    Read Dispatch <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
         POST GRID
         ═══════════════════════════════════════ */}
      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="spatial-panel p-16 text-center rim-light">
              <BookOpen size={40} className="text-bl-text-muted/30 mx-auto mb-4" />
              <p className="text-bl-text-muted text-lg max-w-md mx-auto leading-relaxed">
                No dispatches in this category yet. Watch this dimension.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 scene-3d-near">
              {filteredPosts.slice(1).map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="tilt-card group"
                >
                  <div className="spatial-panel p-6 md:p-8 h-full flex flex-col rim-light">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      {post.category && (
                        <span className="px-2 py-0.5 rounded-full bg-bl-glass border border-bl-glass-border text-bl-gold text-[10px] font-bold uppercase tracking-widest">
                          {post.category}
                        </span>
                      )}
                      <ArrowRight
                        size={14}
                        className="text-bl-text-muted/30 group-hover:text-bl-gold group-hover:translate-x-1 transition-all"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold uppercase mb-3 font-display group-hover:text-bl-gold transition-colors leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-bl-text-muted leading-relaxed mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-bl-glass-border text-[10px] text-bl-text-muted font-mono">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {post.readTime} min
                        </span>
                      )}
                      {post.tags?.length > 0 && (
                        <span className="flex items-center gap-1 text-bl-gold/60">
                          <Tag size={10} /> #{post.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
