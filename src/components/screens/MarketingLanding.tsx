"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MarketingContent from "@/app/(marketing)/MarketingContent";

export default function MarketingLanding() {
  const router = useRouter();

  useEffect(() => {
    const isProduction = window.location.hostname === 'blacklight-web-designs.vercel.app' || 
                         window.location.hostname === 'www.blacklight-web-designs.vercel.app';
    
    if (!isProduction) {
      console.log("Running locally - showing full marketing site");
    }
  }, []);

  return <MarketingContent />;
}