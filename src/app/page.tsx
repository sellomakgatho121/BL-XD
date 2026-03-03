"use client";

import { useState, useEffect } from "react";
import ComingSoon from '@/components/screens/ComingSoon';
import Home from '@/components/screens/Home';
import DevModeSwitcher from '@/components/DevModeSwitcher';

export default function Page() {
  const [devMode, setDevMode] = useState<"main" | "coming-soon">("main");
  const [mounted, setMounted] = useState(false);
  
  const isDev = process.env.NODE_ENV === 'development';
  const siteModeEnv = process.env.NEXT_PUBLIC_SITE_MODE;

  useEffect(() => {
    if (isDev) {
      const stored = localStorage.getItem("dev_site_mode") as "main" | "coming-soon";
      if (stored) setDevMode(stored);
      setMounted(true);
    }
  }, [isDev]);

  if (siteModeEnv === 'coming-soon') return <ComingSoon />;
  if (siteModeEnv === 'main') return <Home />;

  if (!isDev) {
    return <ComingSoon />;
  }

  if (!mounted) return null; 

  return (
    <>
      {devMode === "main" ? <Home /> : <ComingSoon />}
      <DevModeSwitcher />
    </>
  );
}
