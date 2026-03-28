"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/app/(marketing)/page";

export default function MarketingLanding() {
  const router = useRouter();

  useEffect(() => {
    const isProduction = window.location.hostname === 'blacklight-web-designs.vercel.app' || 
                         window.location.hostname === 'www.blacklight-web-designs.vercel.app';
    
    if (!isProduction) {
      console.log("Running locally - showing full marketing site");
    }
  }, []);

  return <LandingPage />;
}