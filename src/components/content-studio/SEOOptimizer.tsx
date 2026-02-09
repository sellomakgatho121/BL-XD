"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  FileText,
  Hash,
  BookOpen,
  Zap,
  RefreshCw,
  Download,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import GlitchText from "@/components/GlitchText";

interface SEOSuggestion {
  type: 'title' | 'meta' | 'content' | 'keyword' | 'readability' | 'structure';
  priority: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  fix: string;
}

interface SEOAnalysisOutput {
  score: number;
  suggestions: SEOSuggestion[];
  keywordDensity: Record<string, number>;
  readabilityScore: number;
  wordCount: number;
}

interface SEOOptimizerProps {
  content?: {
    title?: string;
    metaDescription?: string;
    content?: string;
  };
}

export default function SEOOptimizer({ content: initialContent }: SEOOptimizerProps) {
  const [title, setTitle] = useState(initialContent?.title || "");
  const [metaDescription, setMetaDescription] = useState(initialContent?.metaDescription || "");
  const [content, setContent] = useState(initialContent?.content || "");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [analysis, setAnalysis] = useState<SEOAnalysisOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const handleAnalyze = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          metaDescription,
          content,
          targetKeywords: keywords,
        }),
      });

      if (!response.ok) throw new Error("Failed to analyze content");

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error analyzing SEO:", error);
      alert("Failed to analyze SEO. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[var(--signal-lime)]";
    if (score >= 60) return "text-[#FACC15]";
    if (score >= 40) return "text-[#F97316]";
    return "text-[var(--siren-red)]";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <XCircle className="w-4 h-4 text-[var(--siren-red)]" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-[#F97316]" />;
      case 'low':
        return <AlertCircle className="w-4 h-4 text-[#FACC15]" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'title':
        return <FileText className="w-4 h-4" />;
      case 'meta':
        return <Hash className="w-4 h-4" />;
      case 'content':
        return <BookOpen className="w-4 h-4" />;
      case 'keyword':
        return <Search className="w-4 h-4" />;
      case 'readability':
        return <Zap className="w-4 h-4" />;
      case 'structure':
        return <FileText className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleExport = () => {
    if (!analysis) return;

    const report = {
      timestamp: new Date().toISOString(),
      title,
      metaDescription,
      wordCount: analysis.wordCount,
      readabilityScore: analysis.readabilityScore,
      seoScore: analysis.score,
      keywords: analysis.keywordDensity,
      suggestions: analysis.suggestions,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getReadabilityLabel = (score: number) => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tighter mb-2">
            <GlitchText text="SEO OPTIMIZER" intensity="medium" />
          </h2>
          <p className="text-[var(--spectral-dim)] text-sm">
            Analyze and optimize your content for search engines
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[var(--signal-lime)]" />
              <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                Content Input
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Title *
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your content title..."
                    className="bg-[var(--onyx)] border-[var(--border)]"
                  />
                  <span className="text-xs text-[var(--spectral-dim)] whitespace-nowrap">
                    {title.length} / 60
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Meta Description
                </label>
                <div className="flex items-start gap-2">
                  <Textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Enter meta description (150-160 characters)..."
                    className="bg-[var(--onyx)] border-[var(--border)] min-h-[80px] text-sm"
                  />
                  <span className="text-xs text-[var(--spectral-dim)] whitespace-nowrap">
                    {metaDescription.length} / 160
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Content *
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your content to analyze..."
                  className="bg-[var(--onyx)] border-[var(--border)] min-h-[200px] font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[var(--spectral-muted)] uppercase">
                  Target Keywords
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
                onClick={handleAnalyze}
                disabled={isAnalyzing || !title.trim() || !content.trim()}
                className="w-full bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none font-bold uppercase"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze SEO
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {analysis && (
            <>
              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[var(--signal-lime)]" />
                  <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                    SEO Score
                  </h3>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-[var(--onyx)]"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(analysis.score / 100) * 352} 352`}
                        className={`transition-all duration-1000 ${getScoreColor(analysis.score)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-black ${getScoreColor(analysis.score)}`}>
                        {analysis.score}
                      </span>
                      <span className="text-xs text-[var(--spectral-muted)] uppercase">
                        {getScoreLabel(analysis.score)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[var(--spectral-white)]">
                      {analysis.wordCount}
                    </div>
                    <div className="text-xs text-[var(--spectral-muted)] uppercase">
                      Words
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.readabilityScore)}`}>
                      {analysis.readabilityScore.toFixed(0)}
                    </div>
                    <div className="text-xs text-[var(--spectral-muted)] uppercase">
                      Readability
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--spectral-white)]">
                      {analysis.suggestions.filter(s => s.priority === 'high').length}
                    </div>
                    <div className="text-xs text-[var(--spectral-muted)] uppercase">
                      High Priority
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[var(--signal-lime)]" />
                    <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                      Keyword Density
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(analysis.keywordDensity).map(([keyword, density]) => (
                    <div key={keyword}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--spectral-white)]">{keyword}</span>
                        <span className="text-xs text-[var(--spectral-dim)]">{(density * 100).toFixed(2)}%</span>
                      </div>
                      <div className="h-2 bg-[var(--onyx)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(density * 50, 100)}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full ${
                            density > 0.03 ? 'bg-[var(--siren-red)]' : 
                            density > 0.02 ? 'bg-[#F97316]' : 
                            density >= 0.01 ? 'bg-[var(--signal-lime)]' : 'bg-[#FACC15]'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!analysis && (
            <div className="border border-[var(--border)] bg-[var(--card)] p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <Search className="w-16 h-16 text-[var(--spectral-muted)] mb-4 opacity-50" />
              <p className="text-[var(--spectral-dim)] mb-2">No analysis yet</p>
              <p className="text-sm text-[var(--spectral-muted)]">
                Enter your content and keywords, then click Analyze SEO
              </p>
            </div>
          )}
        </div>
      </div>

      {analysis && analysis.suggestions.length > 0 && (
        <div className="border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[var(--signal-lime)]" />
              <h3 className="font-mono text-sm uppercase text-[var(--spectral-muted)]">
                Suggestions ({analysis.suggestions.length})
              </h3>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-3 h-3 mr-2" /> Export Report
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {analysis.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border ${
                  suggestion.priority === 'high' ? 'border-[var(--siren-red)] bg-[var(--siren-red)]/5' :
                  suggestion.priority === 'medium' ? 'border-[#F97316] bg-[#F97316]/5' :
                  'border-[#FACC15] bg-[#FACC15]/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getPriorityIcon(suggestion.priority)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(suggestion.type)}
                      <span className="text-sm font-medium">{suggestion.issue}</span>
                    </div>
                    <p className="text-xs text-[var(--spectral-muted)] mb-2">
                      {suggestion.suggestion}
                    </p>
                    <p className="text-xs text-[var(--spectral-dim)]">
                      <strong>Fix:</strong> {suggestion.fix}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.priority}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-4 right-4 bg-[var(--signal-lime)] text-[var(--onyx)] px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 ${
          copyNotification ? '' : 'hidden'
        }`}
      >
        <CheckCircle2 className="w-4 h-4" />
        Report exported!
      </motion.div>
    </div>
  );
}
