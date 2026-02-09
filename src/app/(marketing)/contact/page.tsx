import { pageMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";

export const metadata = pageMetadata.contact();

export default function ContactPage() {
  return <ContactContent />;
}
