import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import CRTOverlay from "@/components/CRTOverlay";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Blacklight Web Designs | Revealing Brilliance",
  description:
    "Elite web design for disruptive tech startups and luxury technical brands. Bespoke, high-performance digital experiences from South Africa.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://blacklightwebdesigns.com"
  ),
};

// Organization Schema for GEO (Generative Engine Optimization)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Blacklight Web Designs",
  "url": "https://blacklightwebdesigns.com",
  "logo": "https://blacklightwebdesigns.com/logo.png",
  "sameAs": [
    "https://github.com/blacklight",
    "https://linkedin.com/company/blacklight",
    "https://instagram.com/blacklight"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+27-00-000-0000",
    "contactType": "customer service",
    "email": "hello@blacklight.co.za",
    "areaServed": ["ZA", "Global"],
    "availableLanguage": "en"
  }
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="worker"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <SmoothScroll>
          <CRTOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
