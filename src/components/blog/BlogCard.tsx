import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="group border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--signal-lime)]/50 transition-all duration-300 flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-[var(--onyx-lighter)]">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--spectral-muted)] font-mono text-sm">
            NO SIGNAL
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className="bg-[var(--signal-lime)] text-[var(--onyx)] font-bold rounded-none border-none">
            {post.category}
          </Badge>
        </div>
      </Link>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-xs text-[var(--spectral-muted)] mb-3 font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold leading-tight group-hover:text-[var(--signal-lime)] transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-sm text-[var(--spectral-dim)] mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--spectral-muted)] font-mono">
            {post.readTime} read
          </span>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-sm font-bold text-[var(--signal-lime)] flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            READ TRANSMISSION <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
