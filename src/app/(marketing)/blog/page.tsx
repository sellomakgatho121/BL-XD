"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bl-deep pt-28 pb-20">
      {/* Hero */}
      <div className="relative mb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bl-gold/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-bl-ice mb-4">
            <span className="gold-gradient">Insights</span> & Depth
          </h1>
          <p className="text-sm text-bl-ice/40 max-w-lg mx-auto">
            Engineering perspectives on web performance, AI, design systems, and the future of digital experiences.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="spatial-panel p-10 rounded-3xl border border-white/5 text-center">
            <p className="text-sm text-bl-ice/40">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="spatial-panel group block p-6 md:p-8 rounded-2xl border border-white/5 hover:border-bl-gold/20 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-bl-gold/10 text-bl-gold text-[10px] tracking-wider uppercase rounded-full border border-bl-gold/20">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-bl-ice group-hover:text-bl-gold transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-bl-ice/40 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-[10px] text-bl-ice/30">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime} min read</span>
                      {post.tags?.length > 0 && (
                        <span className="flex items-center gap-1"><Tag size={10} /> {post.tags.slice(0, 2).join(", ")}</span>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-bl-ice/20 group-hover:text-bl-gold group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
