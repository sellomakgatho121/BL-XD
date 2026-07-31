"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((posts) => {
        const found = posts.find((p: any) => p.slug === slug);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bl-deep flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bl-deep flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-bl-ice mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-bl-gold hover:underline flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bl-deep pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-bl-ice/40 hover:text-bl-gold mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <article className="spatial-panel p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-bl-gold/10 text-bl-gold text-[10px] tracking-wider uppercase rounded-full border border-bl-gold/20">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-bl-ice mb-4 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-bl-ice/30 mb-8 pb-8 border-b border-white/5">
            <span className="flex items-center gap-1"><User size={12} /> Blacklight</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min read</span>
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag size={12} className="text-bl-ice/20 mt-1" />
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] text-bl-ice/30 border border-white/5 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {post.content?.split("\n").map((line: string, i: number) => {
              if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-bl-ice mt-8 mb-4">{line.replace("# ", "")}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-bl-gold mt-6 mb-3">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-bl-ice mt-5 mb-2">{line.replace("### ", "")}</h3>;
              if (line.startsWith("- ")) return <li key={i} className="text-sm text-bl-ice/60 ml-4 list-disc">{line.replace("- ", "")}</li>;
              if (line.startsWith("**")) {
                const match = line.match(/\*\*(.+?)\*\*/);
                if (match) return <p key={i} className="text-sm text-bl-ice/60 font-bold mt-2">{line}</p>;
              }
              if (line.trim() === "") return <div key={i} className="h-3" />;
              return <p key={i} className="text-sm text-bl-ice/60 leading-relaxed mt-2">{line}</p>;
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
