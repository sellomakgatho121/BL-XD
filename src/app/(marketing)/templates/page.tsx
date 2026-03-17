"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import HeroCanvas from "@/components/three/HeroCanvas";
import { Button } from "@/components/ui/button";
import { ThemePicker } from "@/components/theme/ThemeClient";
import type { ThemeName } from "@/lib/theme";
import { THEMES } from "@/lib/theme";

type MotionProfile = "calm" | "dynamic" | "hyper";

type TemplateId =
  | "t01-brutalist"
  | "t02-kinetic"
  | "t03-modular"
  | "t04-noir"
  | "t05-webgl"
  | "t06-split"
  | "t07-lux"
  | "t08-index"
  | "t09-poster"
  | "t10-system";

type TemplateMeta = {
  id: TemplateId;
  name: string;
  theme: ThemeName;
  motion: MotionProfile;
  note: string;
};

const TEMPLATES: TemplateMeta[] = [
  { id: "t01-brutalist", name: "01 Editorial Brutalist", theme: "paper-negative", motion: "dynamic", note: "Hard rules, manifesto type, aggressive whitespace." },
  { id: "t02-kinetic", name: "02 Kinetic Type Theater", theme: "neon-lattice", motion: "hyper", note: "Animated typography + magnetic CTAs." },
  { id: "t03-modular", name: "03 Asymmetric Modular", theme: "cad-clinical", motion: "dynamic", note: "Instrument panels + mono rails." },
  { id: "t04-noir", name: "04 Noir Portal", theme: "noir-portal", motion: "dynamic", note: "Cinematic contrast, volumetric feel." },
  { id: "t05-webgl", name: "05 WebGL Hero Frame", theme: "aurora-spectral", motion: "hyper", note: "3D viewport as hero, UI overlays." },
  { id: "t06-split", name: "06 Split Narrative", theme: "mono-lab", motion: "dynamic", note: "Statement vs proof, scroll-linked depth." },
  { id: "t07-lux", name: "07 Minimal Luxury", theme: "violet-haze", motion: "calm", note: "Quiet depth, precise spacing." },
  { id: "t08-index", name: "08 Experimental Index", theme: "mint-sterile", motion: "hyper", note: "Secondary index + 3D section pivots." },
  { id: "t09-poster", name: "09 Poster Impact", theme: "sunset-heat", motion: "dynamic", note: "Poster stack type + perspective shifts." },
  { id: "t10-system", name: "10 System Control", theme: "oxide-redline", motion: "dynamic", note: "Control-room modules + hardware buttons." },
];

function setTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
}
function setMotionProfile(motion: MotionProfile) {
  document.documentElement.dataset.motion = motion;
}

function useAwwwardsText() {
  // Letterspacing “tension” via motion value.
  const t = useMotionValue(0);
  const tension = useSpring(t, { stiffness: 280, damping: 26, mass: 0.6 });
  const tracking = useTransform(tension, [0, 1], ["-0.04em", "0.08em"]);
  return { t, tracking };
}

function HeroStage({ label }: { label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const z = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rot = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);

  return (
    <motion.div
      ref={ref}
      style={{ transformStyle: "preserve-3d", translateZ: z, rotateX: rot }}
      className="relative border border-white/10 overflow-hidden h-[52vh] min-h-[420px] max-h-[620px]"
    >
      <HeroCanvas className="opacity-95" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70" />
        <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/60">{label}</span>
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/35">scroll → depth</span>
        </div>
      </div>
    </motion.div>
  );
}

function TemplatePreview({ template }: { template: TemplateMeta }) {
  const { t, tracking } = useAwwwardsText();

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between gap-6">
        <div className="space-y-2">
          <motion.h1
            onMouseEnter={() => t.set(1)}
            onMouseLeave={() => t.set(0)}
            style={{ letterSpacing: tracking }}
            className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter"
          >
            BLACKLIGHT
            <span className="block text-white/55">TEMPLATE LAB</span>
          </motion.h1>
          <p className="max-w-xl text-white/65">
            Awwwards-inspired exploration: interactive 3D hero, scroll-linked 3D motion, and tactile UI depth across all components.
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
            theme: <span className="text-white">{template.theme}</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
            motion: <span className="text-white">{template.motion}</span>
          </div>
          <Button variant="technical" size="sm" asChild>
            <Link href="/">back to site</Link>
          </Button>
        </div>
      </header>

      <HeroStage label={template.name} />

      <section className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
        <div className="space-y-8">
          <div className="border-l border-white/10 pl-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
              {template.note}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {["Performance", "UX", "3D Motion", "Conversion"].map((k) => (
              <div key={k} className="border border-white/10 bg-white/[0.02] p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">{k}</div>
                <div className="mt-3 text-3xl font-mono tabular-nums text-white">98</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg">Start project</Button>
            <Button size="lg" variant="outline">
              View work
            </Button>
            <Button size="lg" variant="technical">
              Get quote
            </Button>
          </div>
        </div>

        <aside className="border border-white/10 bg-white/[0.02] p-6 space-y-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">Theme picker</div>
          <ThemePicker />
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
            Motion profiles are applied per template (calm/dynamic/hyper).
          </div>
        </aside>
      </section>
    </div>
  );
}

export default function TemplatesPage() {
  const [active, setActive] = React.useState<TemplateMeta>(TEMPLATES[0]);

  React.useEffect(() => {
    // ensure we never land on an invalid theme list
    if (!THEMES.includes(active.theme)) setTheme("mono-lab");
    setTheme(active.theme);
    setMotionProfile(active.motion);
  }, [active.motion, active.theme]);

  return (
    <main className="min-h-screen bg-[var(--onyx)] text-[var(--spectral-white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-[360px] shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
                  Templates (10)
                </div>
                <p className="text-white/65">
                  Each template pairs a distinct <span className="text-white">theme pack</span> +{" "}
                  <span className="text-white">3D motion profile</span>.
                </p>
              </div>

              <div className="space-y-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t)}
                    className={`w-full text-left border px-4 py-4 transition-colors ${
                      active.id === t.id
                        ? "border-white text-white bg-white/5"
                        : "border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5"
                    }`}
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em]">{t.name}</div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
                        {t.theme}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                        {t.motion}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border border-white/10 p-4 bg-white/[0.02]">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">Inspiration</div>
                <p className="mt-2 text-white/65 text-sm">
                  Direction is aligned to modern “studio site” craft shown on{" "}
                  <a className="underline text-white" href="https://www.awwwards.com/" target="_blank" rel="noreferrer">
                    awwwards.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <TemplatePreview template={active} />
          </div>
        </div>
      </div>
    </main>
  );
}

