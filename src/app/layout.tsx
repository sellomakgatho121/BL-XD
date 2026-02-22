import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CRTOverlay from "@/components/CRTOverlay";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import VercelAnalytics from "@/components/analytics/VercelAnalytics";
import PlausibleAnalytics from "@/components/analytics/PlausibleAnalytics";
import { AnimationProvider } from "@/components/Provider/AnimationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Blacklight Web Designs | Technical Sharpness",
  description: "Elite web design for disruptive tech startups and luxury technical brands.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blacklightwebdesigns.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <VercelAnalytics />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <PlausibleAnalytics domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} />
        )}
        <CRTOverlay />
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
