import { pageMetadata } from "@/lib/seo";
import ProcessContent from "./ProcessContent";

export const metadata = pageMetadata.about();

export default function ProcessPage() {
  return <ProcessContent />;
}
