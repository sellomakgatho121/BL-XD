import { pageMetadata } from "@/lib/seo";
import ServicesContent from "./ServicesContent";

export const metadata = pageMetadata.services();

export default function ServicesPage() {
  return <ServicesContent />;
}
