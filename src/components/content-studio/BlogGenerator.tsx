"use client";

import { useState } from "react";
import {
  FileText,
  Wand2,
  Save,
  Calendar,
  BookOpen,
  Sparkles,
  CheckCircle,
  Clock,
  Tag,
  Eye,
  Edit3,
  Trash2,
  Copy,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase/client";
import GlitchText from "@/components/GlitchText";

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  readTime: number;
  category: string;
}

interface BlogGeneratorProps {
  onContentGenerated?: (content: BlogPostData) => void;
  onSaveDraft?: (content: BlogPostData) => void;
}

export default function BlogGenerator({ onContentGenerated, onSaveDraft }: BlogGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [tone, setTone] = useState<"professional" | "casual" | "technical" | "friendly">("professional");
  const [category, setCategory] = useState("insights");
  const [targetAudience, setTargetAudience] = useState("");
  const [generatedContent, setGeneratedContent] = useState<BlogPostData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeView, setActiveView] = useState<"input" | "preview" | "edit">("input");
  const [editContent, setEditContent] = useState("");
  const [copyNotification, setCopyNotification] = useState(false);

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          keywords,
          tone,
          category,
          targetAudience,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate content");

      const data = await response.json();
      setGeneratedContent(data);
      setEditContent(data.content);
      setGeneratedContent(data);
      setActiveView("preview");
      onContentGenerated?.(data);
    } catch (error) {
      console.error("Error generating blog post:", error);
      alert("Failed to generate blog post. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!generatedContent) return;

    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const draftData = {
        ...generatedContent,
        content: editContent,
      };

      const { error } = await supabase.from("content_drafts").insert({
        user_id: user.id,
        type: "blog",
        title: draftData.title,
        content: draftData,
        status: "draft",
        tags: draftData.tags,
      });

      if (error) throw error;

      onSaveDraft?.(draftData);
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(editContent);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedContent) {
      const blob = new Blob([editContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${generatedContent.slug}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tighter mb-2">
            <GlitchText text="BLOG GENERATOR" intensity="medium" />
          </h2>
          <p className="text-[var(--spectral-dim)] text-sm">
            Create SEO-optimized blog posts with AI
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[var(--signal-lime)]" />
              <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                Content Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Topic *
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your blog topic..."
                  className="bg-[var(--onyx)] border-[var(--border)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Target Audience
                </label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Small business owners, Developers"
                  className="bg-[var(--onyx)] border-[var(--border)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    className="w-full h-10 px-3 bg-[var(--onyx)] border border-[var(--border)] text-sm focus:border-[var(--signal-lime)] focus:outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                    <option value="friendly">Friendly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 bg-[var(--onyx)] border border-[var(--border)] text-sm focus:border-[var(--signal-lime)] focus:outline-none"
                  >
                    <option value="insights">Insights</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="case-study">Case Study</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Keywords
                </label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder="Add keyword..."
                    className="bg-[var(--onyx)] border-[var(--border)]"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={addKeyword}
                    className="shrink-0"
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="text-xs flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-[var(--siren-red)]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none font-bold uppercase"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {generatedContent && (
            <div className="border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--signal-lime)]" />
                  <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                    Generated Content
                  </h3>
                </div>
                <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)}>
                  <TabsList className="h-8 bg-[var(--onyx)]">
                    <TabsTrigger value="preview" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" /> Preview
                    </TabsTrigger>
                    <TabsTrigger value="edit" className="text-xs">
                      <Edit3 className="w-3 h-3 mr-1" /> Edit
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Title
                  </label>
                  <Input
                    value={generatedContent.title}
                    onChange={(e) => setGeneratedContent({ ...generatedContent, title: e.target.value })}
                    className="bg-[var(--onyx)] border-[var(--border)] font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Excerpt
                  </label>
                  <Textarea
                    value={generatedContent.excerpt}
                    onChange={(e) => setGeneratedContent({ ...generatedContent, excerpt: e.target.value })}
                    className="bg-[var(--onyx)] border-[var(--border)] min-h-[60px] text-sm"
                  />
                </div>

                {activeView === "preview" ? (
                  <div className="space-y-2">
                    <label className="text-xs text-[var(--spectral-muted)] uppercase">
                      Content Preview
                    </label>
                    <div className="border border-[var(--border)] bg-[var(--onyx)] p-4 rounded-md max-h-[400px] overflow-y-auto prose prose-invert prose-sm">
                      <div dangerouslySetInnerHTML={{ __html: generatedContent.content.replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs text-[var(--spectral-muted)] uppercase">
                      Edit Content (Markdown)
                    </label>
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="bg-[var(--onyx)] border-[var(--border)] min-h-[400px] font-mono text-sm"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-[var(--spectral-dim)]">
                  <Clock className="w-4 h-4" />
                  <span>{generatedContent.readTime} min read</span>
                  <Badge variant="outline" className="ml-auto">
                    {generatedContent.category}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="flex-1 bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none"
                  >
                    {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Draft</>}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="flex-1 rounded-none border-[var(--border)]"
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="rounded-none border-[var(--border)]"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!generatedContent && (
            <div className="border border-[var(--border)] bg-[var(--card)] p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <FileText className="w-16 h-16 text-[var(--spectral-muted)] mb-4 opacity-50" />
              <p className="text-[var(--spectral-dim)] mb-2">No content generated yet</p>
              <p className="text-sm text-[var(--spectral-muted)]">
                Enter a topic and click Generate to create your blog post
              </p>
            </div>
          )}
        </div>
      </div>

      {copyNotification && (
        <div className="fixed bottom-4 right-4 bg-[var(--signal-lime)] text-[var(--onyx)] px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="w-4 h-4" />
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
