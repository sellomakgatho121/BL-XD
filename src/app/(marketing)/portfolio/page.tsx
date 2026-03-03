import { pageMetadata } from "@/lib/seo";
import PortfolioContent from "./PortfolioContent";

export const metadata = pageMetadata.portfolio();

export default function PortfolioPage() {
  return <PortfolioContent />;
}
