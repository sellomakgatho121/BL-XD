"use client";

import { useEffect, useState } from "react";
import {
  Newspaper,
  Edit3,
  Eye,
  Trash2,
  Search,
  Calendar,
  Clock,
  FileText,
  Save,
  Globe,
  MoreHorizontal,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorId?: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  readTime: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  draft: { label: "Draft", color: "text-bl-ice/40", bg: "bg-white/5", border: "border-white/10" },
  published: { label: "Published", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  archived: { label: "Archived", color: "text-bl-text-muted", bg: "bg-bl-text-muted/10", border: "border-bl-text-muted/20" },
};

export default function ContentStudioPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        // Include all posts by extending the API call — since /api/blog only returns
        // published, we also check if there are more in the store.
        // For now we load what we get and also simulate drafts
        setPosts(data);
      } catch (e) {
        console.error("Failed to load posts", e);
      }
      setIsLoading(false);
    }
    loadPosts();
  }, []);

  const toggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "archived" : "published";
    setPosts(posts.map((p) =>
      p.id === post.id ? { ...p, status: newStatus as BlogPost["status"] } : p
    ));
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const handleSaveEdit = () => {
    if (!editingPost) return;
    setPosts(posts.map((p) =>
      p.id === editingPost.id ? { ...p, content: editContent, updatedAt: new Date().toISOString() } : p
    ));
    setEditingPost(null);
    setEditContent("");
  };

  const filteredPosts = posts.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bl-ice">Content Studio</h1>
        <p className="text-sm text-bl-ice/40 mt-1">
          {posts.length} posts &bull; {posts.filter((p) => p.status === "published").length} published
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bl-ice/30" />
          <input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice focus:outline-none focus:border-bl-gold/40"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="spatial-panel p-12 text-center">
          <Newspaper className="w-12 h-12 text-bl-gold/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-bl-ice mb-2">No posts found</h3>
          <p className="text-sm text-bl-ice/40">
            {searchQuery ? "Try adjusting your search" : "Blog posts will appear here when created"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post) => {
            const status = statusConfig[post.status];
            return (
              <div key={post.id} className="spatial-panel p-5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-bl-ice truncate">{post.title}</h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider shrink-0 ${status.bg} ${status.color} ${status.border} border`}
                      >
                        {post.status === "published" && <Globe className="w-2.5 h-2.5" />}
                        {post.status === "draft" && <FileText className="w-2.5 h-2.5" />}
                        {status.label}
                      </span>
                    </div>

                    {post.excerpt && (
                      <p className="text-xs text-bl-ice/50 line-clamp-1 mb-2">{post.excerpt}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-bl-ice/40">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      {post.tags.length > 0 && (
                        <span className="text-bl-gold/60">
                          {post.tags.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setEditContent(post.content);
                      }}
                      className="p-2 rounded-lg text-bl-ice/40 hover:text-bl-gold hover:bg-bl-gold/10 transition-all"
                      title="Edit content"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleStatus(post)}
                      className={`p-2 rounded-lg transition-all ${
                        post.status === "published"
                          ? "text-bl-ice/40 hover:text-bl-text-muted hover:bg-white/5"
                          : "text-bl-ice/40 hover:text-green-400 hover:bg-green-400/10"
                      }`}
                      title={post.status === "published" ? "Archive" : "Publish"}
                    >
                      {post.status === "published" ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <Globe className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 rounded-lg text-bl-ice/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingPost(null)} />
          <div className="relative spatial-panel p-6 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-bl-ice">{editingPost.title}</h2>
                <p className="text-xs text-bl-ice/40 mt-0.5">Editing content body</p>
              </div>
              <button
                onClick={() => setEditingPost(null)}
                className="text-bl-ice/40 hover:text-bl-ice transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Metadata display */}
              <div className="flex flex-wrap gap-3 text-[10px] text-bl-ice/40 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                <span>Slug: <span className="text-bl-ice/60 font-mono">{editingPost.slug}</span></span>
                <span>Category: <span className="text-bl-gold">{editingPost.category}</span></span>
                <span>Read time: <span className="text-bl-ice/60">{editingPost.readTime} min</span></span>
              </div>

              <div>
                <label className="block text-xs text-bl-ice/50 mb-1.5">Content (Markdown)</label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={15}
                  className="w-full px-4 py-3 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 resize-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingPost(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/10 text-bl-ice/60 hover:text-bl-ice hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-bl-gold/15 text-bl-gold border border-bl-gold/20 hover:bg-bl-gold/25 transition-all"
                >
                  <Save className="w-3.5 h-3.5 inline mr-1.5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
