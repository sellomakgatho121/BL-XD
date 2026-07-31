import Hero from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services-section";
import MethodSection from "@/components/sections/method-section";
import MetricsSection from "@/components/sections/metrics-section";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CTASection from "@/components/sections/cta-section";
import MarqueeScroll from "@/components/marquee-scroll";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MetricsSection />
      <ServicesSection />
      <PortfolioPreview />
      <section className="relative py-16 overflow-hidden">
        <MarqueeScroll
          text="Depth Engineered Spatial Web AI Native Performance Optimised"
          direction="left"
          speed={35}
          color="text-bl-gold/8"
        />
        <MarqueeScroll
          text="Blacklight Web Designs • South Africa • Global Standard"
          direction="right"
          speed={40}
          color="text-bl-ice/8"
          className="mt-4"
        />
      </section>
      <MethodSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
