import { pageMetadata } from "@/lib/seo";
import PricingContent from "./PricingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...pageMetadata.services(),
  title: "Pricing | Blacklight Web Designs",
  description: "Sprint-based pricing and AI agent packages for South African entrepreneurs. Fixed costs, clear deliverables, no hourly billing.",
  keywords: ["web design pricing", "AI agents", "sprint pricing", "South Africa", "fixed cost", "WhatsApp AI", "Discovery Node"],
};

export default function PricingPage() {
  return <PricingContent />;
}
