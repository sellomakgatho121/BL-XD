"use client";

import { useState } from "react";
import {
  Megaphone,
  RefreshCw,
  Copy,
  Check,
  Download,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import GlitchText from "@/components/GlitchText";

interface SocialPostOutput {
  mainText: string;
  caption: string;
  hashtags: string[];
  emoji: boolean;
}

const PLATFORMS = ["twitter", "linkedin", "instagram", "facebook"] as const;
const TONES = ["professional", "casual", "technical", "friendly", "authoritative"] as const;

export default function SocialGenerator() {
  const [platform, setPlatform] = useState<string>("instagram");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [tone, setTone] = useState<string>("professional");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<SocialPostOutput | null>(null);
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
      const response = await fetch("/api/ai/generate-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          topic,
          keywords,
          tone,
          includeHashtags,
          maxLength,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate social post");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating social post:", error);
      alert("Failed to generate social post. Please try again.");
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
      platform,
      tone,
      topic,
      keywords,
      ...result,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `social-post-${platform}-${Date.now()}.json`;
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
            <GlitchText text="SOCIAL GENERATOR" intensity="medium" />
          </h2>
          <p className="text-[var(--spectral-dim)] text-sm">
            Generate platform-ready social media content with AI
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5 text-[var(--signal-lime)]" />
              <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                Post Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Platform *
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-[var(--border)] bg-[var(--onyx)] text-sm text-[var(--text)] focus:outline-none"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
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
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Topic *
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="What should the post be about?"
                    className="bg-[var(--onyx)] border-[var(--border)]"
                  />
                  <span className="text-xs text-[var(--spectral-dim)] whitespace-nowrap">
                    {topic.length} / 120
                  </span>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Max Length
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={maxLength ?? ""}
                    onChange={(e) => setMaxLength(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="bg-[var(--onyx)] border-[var(--border)]"
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <label className="flex items-center gap-2 text-sm text-[var(--spectral-muted)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHashtags}
                      onChange={(e) => setIncludeHashtags(e.target.checked)}
                      className="accent-[var(--signal-lime)]"
                    />
                    Include hashtags
                  </label>
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
                    <Megaphone className="w-4 h-4 mr-2" />
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Main Text
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {copyButton("mainText", result.mainText)}
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
                <p className="text-sm text-[var(--text)] whitespace-pre-wrap leading-relaxed">
                  {result.mainText}
                </p>
              </div>

              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Caption
                    </h3>
                  </div>
                  {copyButton("caption", result.caption)}
                </div>
                <p className="text-sm text-[var(--text)] whitespace-pre-wrap leading-relaxed">
                  {result.caption}
                </p>
              </div>

              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Hashtags
                    </h3>
                  </div>
                  {copyButton("hashtags", result.hashtags.join(" "))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.hashtags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
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
