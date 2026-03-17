import { pageMetadata } from "@/lib/seo";
import { BlogCard } from "@/components/blog/BlogCard";
import GlitchText from "@/components/GlitchText";
import GrainOverlay from "@/components/blacklight/grain-overlay";
import Scanlines from "@/components/blacklight/scanlines";
import Navigation from "@/components/marketing/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = pageMetadata.blog();

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string | null;
  category: string;
  read_time: number;
  featured_image: string | null;
  profiles?: { full_name: string | null } | null;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, published_at, category, read_time, featured_image, profiles(full_name)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(20);

  if (error || !data) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
  })) as BlogPost[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <div className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)] relative">
      <GrainOverlay opacity={0.03} />
      <Scanlines />
      
      <Navigation />

      <section className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              <GlitchText text="TRANSMISSIONS" intensity="medium" triggerOnHover />
            </h1>
            <p className="text-xl text-[var(--spectral-dim)] max-w-2xl mx-auto">
              Insights, analysis, and technical deep dives from the Blacklight command center.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={{
                    slug: post.slug,
                    title: post.title,
                    excerpt: post.excerpt || "",
                    date: formatDate(post.published_at),
                    author: post.profiles?.full_name || "Blacklight Team",
                    category: post.category,
                    readTime: `${post.read_time} min`,
                    coverImage: post.featured_image || "/blog/default.jpg"
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[var(--spectral-dim)]">No posts yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
