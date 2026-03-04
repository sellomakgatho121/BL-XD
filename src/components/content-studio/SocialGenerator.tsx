"use client";

import { useState } from "react";
import {
  Share2,
  Wand2,
  Calendar,
  Hash,
  Sparkles,
  CheckCircle,
  Copy,
  Download,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase/client";
import GlitchText from "@/components/GlitchText";

type Platform = 'twitter' | 'linkedin' | 'instagram' | 'facebook';
type Tone = 'professional' | 'casual' | 'technical' | 'friendly';

interface SocialPostData {
  platform: Platform;
  mainText: string;
  caption: string;
  hashtags: string[];
  emoji: boolean;
}

interface SocialGeneratorProps {
  onContentGenerated?: (content: SocialPostData) => void;
  onSaveDraft?: (content: SocialPostData) => void;
}

const platforms: { id: Platform; icon: any; label: string; maxLength: number }[] = [
  { id: 'twitter', icon: Twitter, label: 'Twitter/X', maxLength: 280 },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', maxLength: 3000 },
  { id: 'instagram', icon: Instagram, label: 'Instagram', maxLength: 2200 },
  { id: 'facebook', icon: Facebook, label: 'Facebook', maxLength: 63206 },
];

export default function SocialGenerator({ onContentGenerated, onSaveDraft }: SocialGeneratorProps) {
  const [platform, setPlatform] = useState<Platform>('twitter');
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [generatedContent, setGeneratedContent] = useState<SocialPostData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editCaption, setEditCaption] = useState("");
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
      const response = await fetch("/api/ai/generate-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          topic,
          keywords,
          tone,
          includeHashtags,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate content");

      const data = await response.json();
      setGeneratedContent(data);
      setEditCaption(data.caption);
      onContentGenerated?.(data);
    } catch (error) {
      console.error("Error generating social post:", error);
      alert("Failed to generate social post. Please try again.");
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
        caption: editCaption,
      };

      const { error } = await supabase.from("content_drafts").insert({
        user_id: user.id,
        type: "social",
        title: `${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${draftData.mainText.substring(0, 50)}`,
        content: draftData,
        status: "draft",
        tags: draftData.hashtags,
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
      const fullText = generatedContent.hashtags.length > 0
        ? `${editCaption}\n\n${generatedContent.hashtags.map(h => `#${h}`).join(' ')}`
        : editCaption;
      navigator.clipboard.writeText(fullText);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2000);
    }
  };

  const currentPlatform = platforms.find(p => p.id === platform);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tighter mb-2">
            <GlitchText text="SOCIAL GENERATOR" intensity="medium" />
          </h2>
          <p className="text-[var(--spectral-dim)] text-sm">
            Create engaging social media posts for any platform
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5 text-[var(--signal-lime)]" />
              <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                Post Configuration
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        className={`flex items-center gap-2 p-3 text-sm font-mono border transition-all ${platform === p.id
                            ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]/10 text-[var(--signal-lime)]"
                            : "border-[var(--border)] text-[var(--spectral-dim)] hover:border-[var(--spectral-muted)]"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Topic *
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What's your post about?"
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
                    onChange={(e) => setTone(e.target.value as Tone)}
                    className="w-full h-10 px-3 bg-[var(--onyx)] border border-[var(--border)] text-sm focus:border-[var(--signal-lime)] focus:outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                    <option value="friendly">Friendly</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="hashtags"
                    checked={includeHashtags}
                    onChange={(e) => setIncludeHashtags(e.target.checked)}
                    className="w-4 h-4 accent-[var(--signal-lime)]"
                  />
                  <label htmlFor="hashtags" className="text-sm text-[var(--spectral-dim)]">
                    Include hashtags
                  </label>
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
                    Generate Post
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
                  <MessageSquare className="w-5 h-5 text-[var(--signal-lime)]" />
                  <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                    Generated Post
                  </h3>
                </div>
                <Badge variant="outline">
                  {currentPlatform?.label}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-[var(--spectral-muted)] uppercase">
                    Headline
                  </label>
                  <Input
                    value={generatedContent.mainText}
                    onChange={(e) => setGeneratedContent({ ...generatedContent, mainText: e.target.value })}
                    className="bg-[var(--onyx)] border-[var(--border)] font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[var(--spectral-muted)] uppercase">
                      Caption
                    </label>
                    <span className="text-xs text-[var(--spectral-dim)]">
                      {editCaption.length} / {currentPlatform?.maxLength || 280}
                    </span>
                  </div>
                  <Textarea
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="bg-[var(--onyx)] border-[var(--border)] min-h-[150px] text-sm"
                    placeholder="Your post caption..."
                  />
                </div>

                {generatedContent.hashtags.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs text-[var(--spectral-muted)] uppercase">
                      Hashtags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="flex-1 bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none"
                  >
                    {isSaving ? "Saving..." : <><Copy className="w-4 h-4 mr-2" /> Save Draft</>}
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
              <MessageSquare className="w-16 h-16 text-[var(--spectral-muted)] mb-4 opacity-50" />
              <p className="text-[var(--spectral-dim)] mb-2">No post generated yet</p>
              <p className="text-sm text-[var(--spectral-muted)]">
                Enter a topic and click Generate to create your social post
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
