import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  locale?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  locale = 'en_ZA',
  siteName = 'Blacklight Web Designs',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blacklightwebdesigns.co.za';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title: title ? `${title} | Blacklight Web Designs` : 'Blacklight Web Designs',
    description: description || 'Blacklight Web Designs - Building digital experiences that convert. Professional web design, development, and digital marketing for South African SMEs.',
    keywords: keywords.length > 0 ? keywords.join(', ') : 'web design, web development, digital marketing, South Africa, SME, e-commerce, responsive design',
    authors: author ? [{ name: author }] : [],
    creator: author,
    publisher: 'Blacklight Web Designs',
    
    // Open Graph
    openGraph: {
      type: type as 'website' | 'article',
      locale,
      url: fullUrl,
      title: title || 'Blacklight Web Designs',
      description: description || 'Building digital experiences that convert',
      siteName,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: title || 'Blacklight Web Designs',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: title || 'Blacklight Web Designs',
      description: description || 'Building digital experiences that convert',
      images: [defaultImage],
      creator: '@blacklightweb',
      site: '@blacklightweb',
    },
    
    // Additional meta tags
    other: {
      'theme-color': '#00ff41',
      'msapplication-TileColor': '#0a0a0a',
      'msapplication-config': '/browserconfig.xml',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'Blacklight',
      'application-name': 'Blacklight Web Designs',
      'mobile-web-app-capable': 'yes',
    },
    
    // Verification tags
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      other: {
        bing: process.env.BING_VERIFICATION || '',
      },
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Icons
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    
    // Manifest
    manifest: '/site.webmanifest',
  };
}

// Page-specific metadata generators
export const pageMetadata = {
  home: () => generateMetadata({
    title: 'Home',
    description: 'Blacklight Web Designs - Building digital experiences that convert. Professional web design, development, and digital marketing for South African SMEs.',
    keywords: ['web design', 'web development', 'digital marketing', 'South Africa', 'SME', 'e-commerce', 'responsive design'],
    type: 'website',
  }),
  
  services: () => generateMetadata({
    title: 'Services',
    description: 'Comprehensive web design and development services for South African SMEs. From Spark packages to custom enterprise solutions.',
    keywords: ['web design services', 'web development', 'e-commerce', 'custom websites', 'SME packages'],
    type: 'website',
  }),
  
  portfolio: () => generateMetadata({
    title: 'Portfolio',
    description: 'View our portfolio of successful web design and development projects for South African businesses.',
    keywords: ['portfolio', 'case studies', 'web design examples', 'development projects'],
    type: 'website',
  }),
  
  contact: () => generateMetadata({
    title: 'Contact',
    description: 'Get in touch with Blacklight Web Designs for your next web project. Free consultation for South African SMEs.',
    keywords: ['contact', 'web design quote', 'consultation', 'South Africa'],
    type: 'website',
  }),
  
  about: () => generateMetadata({
    title: 'About',
    description: 'Learn about Blacklight Web Designs and our mission to help South African SMEs succeed online.',
    keywords: ['about', 'company', 'mission', 'team', 'South Africa'],
    type: 'website',
  }),
  
  blog: () => generateMetadata({
    title: 'Blog',
    description: 'Tips, insights, and trends in web design, development, and digital marketing for South African businesses.',
    keywords: ['blog', 'web design tips', 'digital marketing', 'SME advice'],
    type: 'website',
  }),
  
  serviceDetail: (serviceName: string, description: string) => generateMetadata({
    title: serviceName,
    description,
    keywords: [serviceName.toLowerCase(), 'web design', 'web development', 'South Africa'],
    type: 'article',
    section: 'Services',
  }),
  
  projectDetail: (projectName: string, description: string) => generateMetadata({
    title: projectName,
    description,
    keywords: [projectName.toLowerCase(), 'portfolio', 'case study', 'web design'],
    type: 'article',
    section: 'Portfolio',
  }),
  
  blogPost: (title: string, description: string, author: string, publishDate: string) => generateMetadata({
    title,
    description,
    keywords: [title.toLowerCase(), 'blog', 'web design', 'digital marketing'],
    type: 'article',
    author,
    publishedTime: publishDate,
    section: 'Blog',
  }),
};
