import Link from 'next/link';

export default function LabPage() {
  return (
    <div className="min-h-screen bg-black text-white p-20 font-mono">
      <h1 className="text-6xl font-black mb-20 tracking-tighter">LAB / EXPERIMENTS</h1>
      <div className="grid gap-10 max-w-2xl">
        <Link href="/lab/organic" className="group p-8 border border-white/10 hover:border-signal-lime/50 transition-all">
          <h2 className="text-3xl font-bold mb-4 text-signal-lime">01 / ORGANIC</h2>
          <p className="text-white/50">The Bioluminescent Organism. Liquid transitions, cellular shapes, and glowing ripples.</p>
        </Link>
        <Link href="/lab/brutalist" className="group p-8 border border-white/10 hover:border-siren-red/50 transition-all">
          <h2 className="text-3xl font-bold mb-4 text-siren-red">02 / BRUTALIST</h2>
          <p className="text-white/50">Digital Archeology. High-contrast, raw typography, and unstable glitch-based layouts.</p>
        </Link>
        <Link href="/lab/spatial" className="group p-8 border border-white/10 hover:border-blue-500/50 transition-all">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">03 / SPATIAL</h2>
          <p className="text-white/50">The Spatial Dimension. 3D depth, particle fields, and traveling through the void.</p>
        </Link>
      </div>
    </div>
  );
}
