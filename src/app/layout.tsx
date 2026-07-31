import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter, Orbitron } from "next/font/google";
import "./globals.css";
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

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080F",
};

export const metadata: Metadata = {
  title: "Blacklight Web Designs | Depth Engineered",
  description:
    "Elite spatial web engineering for disruptive tech startups and luxury technical brands. Custom, high-performance digital experiences from South Africa.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://blacklightwebdesigns.com"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
};

// Organization Schema for GEO
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} ${orbitron.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
