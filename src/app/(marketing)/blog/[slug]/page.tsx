import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import Navigation from "@/components/marketing/navigation";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  published_at: string | null;
  category: string;
  read_time: number;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  profiles?: { full_name: string | null } | null;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, content, excerpt, published_at, category, read_time, featured_image, meta_title, meta_description, profiles(full_name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    profiles: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles
  } as BlogPost;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) return pageMetadata.blog();
  
  return pageMetadata.blogPost(
    post.meta_title || post.title,
    post.meta_description || post.excerpt || "Read our latest analysis",
    post.profiles?.full_name || "Blacklight Team",
    post.published_at || ""
  );
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const authorName = post.profiles?.full_name || "Blacklight Team";
  const publishedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <ReadingProgress />
      <GrainOverlay opacity={0.03} />
      <Scanlines />
      <Navigation />

      <article className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <Link 
                href="/blog"
                className="inline-flex items-center text-sm text-[var(--spectral-muted)] hover:text-[var(--signal-lime)] transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Transmissions
              </Link>

              <header className="mb-12">
                <div className="flex gap-2 mb-6">
                  <Badge className="bg-[var(--signal-lime)] text-[var(--onyx)] rounded-none border-none">
                    {post.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--spectral-muted)] font-mono border-y border-[var(--border)] py-4">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {publishedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {authorName}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.read_time} min read
                  </span>
                </div>
              </header>

              <div 
                className="prose prose-invert prose-lime max-w-none mb-16
                  prose-headings:font-black prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-code:bg-[var(--card)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:text-[var(--signal-lime)] prose-code:font-mono prose-code:text-sm
                  prose-pre:bg-[var(--card)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:rounded-none prose-pre:overflow-x-auto
                  prose-a:text-[var(--signal-lime)] prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-[var(--signal-lime)] prose-blockquote:bg-[var(--signal-lime)]/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic
                  prose-img:rounded-none prose-img:border prose-img:border-[var(--border)]
                  prose-strong:text-[var(--spectral-white)]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="border-t border-[var(--border)] pt-8 flex justify-between items-center">
                <div className="text-sm text-[var(--spectral-muted)]">
                  End of Transmission
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>
            </div>

            {/* Sticky Table of Contents */}
            <TableOfContents />
          </div>
        </div>
      </article>
    </div>
  );
}
