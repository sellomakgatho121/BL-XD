import { pageMetadata } from "@/lib/seo";
import AboutContent from "./AboutContent";

export const metadata = pageMetadata.about();

export default function AboutPage() {
  return <AboutContent />;
}
