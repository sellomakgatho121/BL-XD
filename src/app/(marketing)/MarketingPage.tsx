import { pageMetadata } from "@/lib/seo";
import MarketingContent from "./MarketingContent";

export const metadata = pageMetadata.home();

export default function MarketingPage() {
  return <MarketingContent />;
}
