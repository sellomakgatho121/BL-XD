"use client";

import { useState } from "react";
import {
  PenLine,
  RefreshCw,
  Copy,
  Check,
  Download,
  Hash,
  Clock,
  FileText,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import GlitchText from "@/components/GlitchText";

interface BlogPostOutput {
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

const TONES = ["professional", "casual", "technical", "friendly", "authoritative"] as const;
const CATEGORIES = ["insights", "guide", "news", "update", "case-study"] as const;

export default function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [tone, setTone] = useState<string>("professional");
  const [category, setCategory] = useState<string>("insights");
  const [targetAudience, setTargetAudience] = useState("");
  const [wordCount, setWordCount] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<BlogPostOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const addKeyword = () => {
    const k = keywordInput.trim();
    if (k && !keywords.includes(k)) setKeywords([...keywords, k]);
    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
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
          wordCount,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate blog post");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating blog post:", error);
      alert("Failed to generate blog post. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleExport = () => {
    if (!result) return;

    const report = {
      timestamp: new Date().toISOString(),
      topic,
      tone,
      targetAudience,
      keywords,
      ...result,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-post-${result.slug || Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyButton = (field: string, text: string) => (
    <Button
      variant="outline"
      size="icon"
      className="shrink-0"
      onClick={() => copyToClipboard(text, field)}
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-[var(--signal-lime)]" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tighter mb-2">
            <GlitchText text="BLOG GENERATOR" intensity="medium" />
          </h2>
          <p className="text-[var(--spectral-dim)] text-sm">
            Draft full blog posts with SEO metadata in seconds
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <PenLine className="w-5 h-5 text-[var(--signal-lime)]" />
              <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                Article Brief
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
                  placeholder="What should the article be about?"
                  className="bg-[var(--onyx)] border-[var(--border)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-[var(--border)] bg-[var(--onyx)] text-sm text-[var(--text)] focus:outline-none"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-[var(--border)] bg-[var(--onyx)] text-sm text-[var(--text)] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Target Audience
                  </label>
                  <Input
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. small business owners"
                    className="bg-[var(--onyx)] border-[var(--border)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Word Count
                  </label>
                  <Input
                    type="number"
                    min={200}
                    value={wordCount ?? ""}
                    onChange={(e) => setWordCount(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="bg-[var(--onyx)] border-[var(--border)]"
                  />
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
                    <Hash className="w-4 h-4" />
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
                        ×
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
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <PenLine className="w-4 h-4 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {result && (
            <>
              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Title &amp; Meta
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {copyButton("metaTitle", result.metaTitle)}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleExport}
                      className="shrink-0"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[var(--text)] mb-1">{result.title}</h4>
                <p className="text-xs text-[var(--spectral-dim)] font-mono mb-3">/{result.slug}</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-xs uppercase text-[var(--spectral-muted)]">Meta title: </span>
                    <span className="text-[var(--text)]">{result.metaTitle}</span>
                  </p>
                  <p>
                    <span className="text-xs uppercase text-[var(--spectral-muted)]">Meta description: </span>
                    <span className="text-[var(--text)]">{result.metaDescription}</span>
                  </p>
                </div>
              </div>

              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Excerpt
                    </h3>
                  </div>
                  {copyButton("excerpt", result.excerpt)}
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">{result.excerpt}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[var(--spectral-dim)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {result.readTime} min read
                  </span>
                  <span className="flex items-center gap-1 uppercase">
                    <Tag className="w-3.5 h-3.5" />
                    {result.category}
                  </span>
                </div>
              </div>

              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PenLine className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Content
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {copyButton("content", result.content)}
                  </div>
                </div>
                <Textarea
                  readOnly
                  value={result.content}
                  className="bg-[var(--onyx)] border-[var(--border)] min-h-[320px] font-mono text-sm"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
