import { AsymmetricNav } from "@/components/ui/AsymmetricNav";
import { HeroBrutalist3D } from "@/components/ui/HeroBrutalist3D";
import { ContinuousFlowSection } from "@/components/ui/ContinuousFlowSection";

/**
 * Radical Home Experience
 * This page serves as the assembly of our Mixed Topology architecture.
 */
export default function Home() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <AsymmetricNav />
      {/* 
        The Hero carries the weight of attention retention. 
        It sits at Z-index 0 to allow continuous content to scroll *over* it if necessary,
        or just to bleed naturally into the next section.
      */}
      <HeroBrutalist3D />

      {/* 
        The Continuous Stream carries the user through the narrative without breaking 
        immersion via safe-harbor grid blocks.
      */}
      <ContinuousFlowSection />
    </main>
  );
}
