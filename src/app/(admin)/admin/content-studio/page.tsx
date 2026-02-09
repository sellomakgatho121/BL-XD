"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wand2,
  FileText,
  Share2,
  Search,
  Calendar,
  FolderKanban,
  Save,
  Clock,
  MoreVertical,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogGenerator from "@/components/content-studio/BlogGenerator";
import SocialGenerator from "@/components/content-studio/SocialGenerator";
import SEOOptimizer from "@/components/content-studio/SEOOptimizer";
import GlitchText from "@/components/GlitchText";

interface Draft {
  id: string;
  type: 'blog' | 'social' | 'marketing';
  title: string;
  status: 'draft' | 'reviewing' | 'scheduled' | 'published';
  updated_at: string;
}

export default function ContentStudioPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "social" | "seo">("blog");
  const [showDrafts, setShowDrafts] = useState(false);
  const [drafts] = useState<Draft[]>([
    { id: '1', type: 'blog', title: 'Getting Started with AI', status: 'draft', updated_at: new Date().toISOString() },
    { id: '2', type: 'social', title: 'Twitter: New features launch', status: 'scheduled', updated_at: new Date().toISOString() },
  ]);
  const [calendarView, setCalendarView] = useState(false);

  const handleContentGenerated = (content: any) => {
    console.log('Content generated:', content);
  };

  const handleSaveDraft = (content: any) => {
    console.log('Draft saved:', content);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-[var(--signal-lime)]/10 text-[var(--signal-lime)]';
      case 'scheduled':
        return 'bg-[var(--electric-purple)]/10 text-[var(--electric-purple)]';
      case 'reviewing':
        return 'bg-[#FACC15]/10 text-[#FACC15]';
      default:
        return 'bg-[var(--spectral-muted)]/10 text-[var(--spectral-muted)]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            <GlitchText text="AI CONTENT STUDIO" intensity="medium" />
          </h1>
          <p className="text-[var(--spectral-dim)]">
            Generate, optimize, and manage your content with AI
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDrafts(!showDrafts)}
            className="border-[var(--border)]"
          >
            <FolderKanban className="w-4 h-4 mr-2" />
            Drafts ({drafts.length})
          </Button>
          <Button
            variant="outline"
            onClick={() => setCalendarView(!calendarView)}
            className="border-[var(--border)]"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
        </div>
      </div>

      {showDrafts && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Drafts</h3>
            <Button variant="ghost" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Manage All
            </Button>
          </div>
          <div className="space-y-2">
            {drafts.map((draft) => (
              <motion.div
                key={draft.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-4 border border-[var(--border)] hover:border-[var(--spectral-muted)] transition-colors"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded ${
                  draft.type === 'blog' ? 'bg-[var(--signal-lime)]/10 text-[var(--signal-lime)]' :
                  'bg-[var(--electric-purple)]/10 text-[var(--electric-purple)]'
                }`}>
                  {draft.type === 'blog' ? <FileText className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{draft.title}</p>
                  <p className="text-xs text-[var(--spectral-dim)] flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3" />
                    {new Date(draft.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(draft.status)}`}>
                  {draft.status}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-[var(--siren-red)]">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {calendarView && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Content Calendar</h3>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Full Calendar
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-[var(--spectral-muted)] mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-medium uppercase">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3 + 1;
              const hasContent = [5, 12, 18, 24, 28].includes(day);
              const isToday = day === new Date().getDate();
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center text-sm border border-[var(--border)] cursor-pointer hover:border-[var(--spectral-muted)] transition-colors ${
                    hasContent ? 'bg-[var(--signal-lime)]/5' : ''
                  } ${isToday ? 'border-[var(--signal-lime)] text-[var(--signal-lime)]' : ''} ${
                    day <= 0 || day > 31 ? 'opacity-30' : ''
                  }`}
                >
                  {day > 0 && day <= 31 && (
                    <div className="relative">
                      {day}
                      {hasContent && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--signal-lime)] rounded-full" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="w-full h-12 bg-[var(--onyx)] border border-[var(--border)]">
          <TabsTrigger
            value="blog"
            className="flex-1 data-[state=active]:bg-[var(--signal-lime)]/10 data-[state=active]:text-[var(--signal-lime)]"
          >
            <FileText className="w-4 h-4 mr-2" />
            Blog Generator
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="flex-1 data-[state=active]:bg-[var(--electric-purple)]/10 data-[state=active]:text-[var(--electric-purple)]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Social Generator
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="flex-1 data-[state=active]:bg-[#FACC15]/10 data-[state=active]:text-[#FACC15]"
          >
            <Search className="w-4 h-4 mr-2" />
            SEO Optimizer
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="blog" className="mt-0">
            <BlogGenerator
              onContentGenerated={handleContentGenerated}
              onSaveDraft={handleSaveDraft}
            />
          </TabsContent>

          <TabsContent value="social" className="mt-0">
            <SocialGenerator
              onContentGenerated={handleContentGenerated}
              onSaveDraft={handleSaveDraft}
            />
          </TabsContent>

          <TabsContent value="seo" className="mt-0">
            <SEOOptimizer />
          </TabsContent>
        </div>
      </Tabs>

      <div className="border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-[var(--signal-lime)]" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-black text-[var(--spectral-white)]">12</div>
            <div className="text-xs text-[var(--spectral-muted)] uppercase">Posts Created</div>
          </div>
          <div className="text-center p-4 border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-black text-[var(--signal-lime)]">85</div>
            <div className="text-xs text-[var(--spectral-muted)] uppercase">Avg SEO Score</div>
          </div>
          <div className="text-center p-4 border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-black text-[var(--electric-purple)]">5</div>
            <div className="text-xs text-[var(--spectral-muted)] uppercase">Scheduled</div>
          </div>
          <div className="text-center p-4 border border-[var(--border)] rounded-lg">
            <div className="text-2xl font-black text-[#FACC15]">2.4k</div>
            <div className="text-xs text-[var(--spectral-muted)] uppercase">Est. Reach</div>
          </div>
        </div>
      </div>
    </div>
  );
}
