"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube, 
  Music, 
  Send, 
  Calendar, 
  RefreshCw, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Hash,
  Wand2,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlitchText from "@/components/GlitchText";

type Platform = 'instagram' | 'linkedin' | 'twitter' | 'facebook' | 'tiktok' | 'youtube';
type DesignStyle = 'circuit' | 'neural' | 'matrix' | 'cyber' | 'terminal' | 'quantum';

interface PostContent {
  mainText: string;
  subText: string;
  caption: string;
}

const focusContent = {
  launch: {
    mainText: ["Can't wait? Me too...", "Something amazing is coming", "The countdown has begun", "Revolution loading..."],
    subText: ["Our agentic devs are coding so fast, their keyboards are smoking 🔥", "Fire department is on standby for agentic launch 🔥", "How long would YOU wait for something agentic and amazing?"]
  },
  community: {
    mainText: ["Join the digital revolution", "Transform your online presence", "The future is collaborative", "Building tomorrow together"],
    subText: ["Let's create something amazing together", "Your success is our mission", "Community-driven innovation", "Empowering digital excellence"]
  },
  behind: {
    mainText: ["Behind the scenes at Blacklight", "Where the magic happens", "The workshop of innovation", "Crafting digital excellence"],
    subText: ["Meet the agentic minds", "Where code meets creativity", "The engine room of innovation", "Building your digital future"]
  },
  tech: {
    mainText: ["Next-gen web technology", "AI-powered innovation", "Technical excellence redefined", "The code of tomorrow"],
    subText: ["Pushing boundaries of possibility", "Where innovation meets execution", "Technical precision meets creativity", "Engineering digital solutions"]
  },
  future: {
    mainText: ["The future is now", "Tomorrow's technology today", "Digital evolution continues", "Shaping tomorrow's web"],
    subText: ["Experience the revolution", "Be ahead of the curve", "Future-proof your presence", "Innovation never stops"]
  },
  team: {
    mainText: ["Meet the visionaries", "The minds behind the magic", "Our agentic team", "Innovation architects"],
    subText: ["Passion meets precision", "Dedicated to your success", "The dream team of tech", "Where talent creates magic"]
  }
};

const styles = {
  circuit: { name: "Circuit Board", accent: "#D7FF00", secondary: "#FF003C", desc: "Technical precision with circuit patterns" },
  neural: { name: "Neural Network", accent: "#00CCFF", secondary: "#FF00FF", desc: "AI connections with data flows" },
  matrix: { name: "Matrix Code", accent: "#00FF00", secondary: "#0080FF", desc: "Digital rain with code effects" },
  cyber: { name: "Cyberpunk", accent: "#FF1493", secondary: "#00FFFF", desc: "Neon glow with futuristic vibes" },
  terminal: { name: "Terminal", accent: "#00FF00", secondary: "#FFFFFF", desc: "Command line with green text" },
  quantum: { name: "Quantum", accent: "#8B00FF", secondary: "#00FFFF", desc: "Particle effects with purple glow" },
};

export default function SocialMediaGenerator() {
  const [activePlatform, setActivePlatform] = useState<Platform>('instagram');
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>('circuit');
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<PostContent>({
    mainText: "Can't wait? Me too...",
    subText: "Our agentic devs are coding so fast, their keyboards are smoking 🔥",
    caption: "Can't wait? Me too... 🔥\n\nOur agentic devs are coding so fast, their keyboards are smoking. Fire department is on standby for the agentic launch.\n\n#ComingSoon #WebDesign #BlacklightWebDesigns #TechLaunch"
  });

  const [postFocus, setPostFocus] = useState<keyof typeof focusContent>('launch');

  const togglePlatformConnection = (platform: Platform) => {
    if (connectedPlatforms.includes(platform)) {
      setConnectedPlatforms(prev => prev.filter(p => p !== platform));
    } else {
      const width = 600;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const authWindow = window.open('', '_blank', `width=${width},height=${height},left=${left},top=${top}`);
      
      if (authWindow) {
        authWindow.document.write(`
          <div style="background:#0a0a0a;color:#fff;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;">
            <h2>Connecting to ${platform.charAt(0).toUpperCase() + platform.slice(1)}...</h2>
            <div style="width:40px;height:40px;border:3px solid #D7FF00;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
          </div>
        `);
        
        setTimeout(() => {
          authWindow.close();
          setConnectedPlatforms(prev => [...prev, platform]);
        }, 1500);
      }
    }
  };

  const randomizeContent = (type: 'main' | 'sub') => {
    const options = focusContent[postFocus][type === 'main' ? 'mainText' : 'subText'];
    const random = options[Math.floor(Math.random() * options.length)];
    setContent(prev => ({
      ...prev,
      [type === 'main' ? 'mainText' : 'subText']: random
    }));
  };

  const randomizeStyle = () => {
    const styleKeys = Object.keys(styles) as DesignStyle[];
    const random = styleKeys[Math.floor(Math.random() * styleKeys.length)];
    setSelectedStyle(random);
  };

  const handlePost = async () => {
    if (connectedPlatforms.length === 0) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    alert(`Posted successfully to ${connectedPlatforms.length} platforms!`);
  };

const PostPreview = ({ selectedStyle, content }: { selectedStyle: DesignStyle, content: PostContent }) => {
  const currentStyle = styles[selectedStyle];
  
  return (
    <div className="relative w-full aspect-square bg-black border border-[var(--border)] overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentStyle.accent}20 0%, transparent 70%)`
        }}
      />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={currentStyle.accent} strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
        <div 
          className="w-10 h-10 flex items-center justify-center font-bold text-black clip-path-hexagon"
          style={{ 
            backgroundColor: currentStyle.accent,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
        >
          B
        </div>
        <div 
          className="text-[10px] font-bold tracking-widest leading-tight text-left"
          style={{ color: currentStyle.accent }}
        >
          BLACKLIGHT<br/>WEB DESIGNS
        </div>
      </div>

      <div className="relative z-10 max-w-[80%]">
        <motion.h2 
          key={content.mainText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase"
          style={{ 
            color: '#fff',
            textShadow: `2px 2px 0px ${currentStyle.secondary}`
          }}
        >
          {content.mainText}
        </motion.h2>
        
        <motion.p 
          key={content.subText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-mono mb-8"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          {content.subText}
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block px-6 py-3 border-2 font-bold uppercase tracking-wider text-sm"
          style={{ 
            borderColor: currentStyle.accent,
            color: currentStyle.accent,
            boxShadow: `0 0 20px ${currentStyle.accent}40`
          }}
        >
          Get Notified 🚀
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 w-full animate-scanline pointer-events-none" />
    </div>
  );
};

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            <GlitchText text="SOCIAL COMMAND" intensity="medium" />
          </h1>
          <p className="text-[var(--spectral-dim)]">
            Generative social media asset creation and scheduling.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-sm font-mono uppercase text-[var(--signal-lime)] mb-4 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Connected Platforms
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'instagram', icon: Instagram, label: 'Instagram' },
                { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                { id: 'twitter', icon: Twitter, label: 'Twitter/X' },
                { id: 'facebook', icon: Facebook, label: 'Facebook' },
                { id: 'tiktok', icon: Music, label: 'TikTok' },
                { id: 'youtube', icon: Youtube, label: 'YouTube' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => togglePlatformConnection(p.id as Platform)}
                  className={`flex items-center gap-2 p-3 text-sm font-mono border transition-all ${
                    connectedPlatforms.includes(p.id as Platform)
                      ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]/10 text-[var(--signal-lime)]"
                      : "border-[var(--border)] text-[var(--spectral-dim)] hover:border-[var(--spectral-muted)]"
                  }`}
                >
                  <p.icon className="w-4 h-4" />
                  <span className="truncate">{p.label}</span>
                  {connectedPlatforms.includes(p.id as Platform) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--signal-lime)] ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
            <h3 className="text-sm font-mono uppercase text-[var(--signal-lime)] mb-4 flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> Content Generator
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs text-[var(--spectral-muted)] uppercase">Campaign Focus</label>
              <select 
                value={postFocus}
                onChange={(e) => setPostFocus(e.target.value as keyof typeof focusContent)}
                className="w-full h-10 px-3 bg-[var(--onyx)] border border-[var(--border)] text-sm focus:border-[var(--signal-lime)] focus:outline-none"
              >
                <option value="launch">🚀 Launch Countdown</option>
                <option value="community">🤝 Community Outreach</option>
                <option value="behind">🎬 Behind the Scenes</option>
                <option value="tech">⚡ Technical Innovation</option>
                <option value="future">🔮 Future Vision</option>
                <option value="team">👥 Team Spotlight</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[var(--spectral-muted)] uppercase">Headline</label>
              <div className="flex gap-2">
                <Input 
                  value={content.mainText}
                  onChange={(e) => setContent(prev => ({ ...prev, mainText: e.target.value }))}
                  className="bg-[var(--onyx)] border-[var(--border)]"
                />
                <Button variant="outline" size="icon" onClick={() => randomizeContent('main')} className="shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[var(--spectral-muted)] uppercase">Subtext</label>
              <div className="flex gap-2">
                <Input 
                  value={content.subText}
                  onChange={(e) => setContent(prev => ({ ...prev, subText: e.target.value }))}
                  className="bg-[var(--onyx)] border-[var(--border)]"
                />
                <Button variant="outline" size="icon" onClick={() => randomizeContent('sub')} className="shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[var(--spectral-muted)] uppercase">Caption</label>
              <Textarea 
                value={content.caption}
                onChange={(e) => setContent(prev => ({ ...prev, caption: e.target.value }))}
                className="bg-[var(--onyx)] border-[var(--border)] min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono uppercase text-[var(--signal-lime)] flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Live Preview
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={randomizeStyle}>
                  <Wand2 className="w-3 h-3 mr-2" /> Remix Style
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-2" /> Export
                </Button>
              </div>
            </div>
            
            <PostPreview selectedStyle={selectedStyle} content={content} />

            <div className="mt-6 flex gap-4">
              <Button 
                onClick={handlePost} 
                disabled={connectedPlatforms.length === 0 || isGenerating}
                className="flex-1 bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none font-bold uppercase"
              >
                {isGenerating ? (
                  "Generating Assets..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post to {connectedPlatforms.length || '0'} Platforms
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1 rounded-none border-[var(--border)]">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
            {connectedPlatforms.length === 0 && (
              <p className="text-xs text-[var(--siren-red)] mt-2 text-center">
                * Connect at least one platform to post
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="border border-[var(--border)] bg-[var(--card)] p-6 h-full">
            <h3 className="text-sm font-mono uppercase text-[var(--signal-lime)] mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4" /> Design System
            </h3>
            
            <div className="space-y-3">
              {(Object.keys(styles) as DesignStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full text-left p-3 border transition-all ${
                    selectedStyle === style
                      ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]/10"
                      : "border-[var(--border)] hover:border-[var(--spectral-muted)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm" style={{ color: styles[style].accent }}>
                      {styles[style].name}
                    </span>
                    {selectedStyle === style && <CheckCircle className="w-3 h-3" style={{ color: styles[style].accent }} />}
                  </div>
                  <p className="text-xs text-[var(--spectral-dim)]">
                    {styles[style].desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
