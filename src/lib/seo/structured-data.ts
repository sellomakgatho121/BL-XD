"use client";

export interface AgentCardSchema {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
  category?: string;
  areaServed?: {
    name: string;
    type: string;
  };
  provider?: {
    name: string;
    url?: string;
  };
  review?: {
    ratingValue: number;
    bestRating: number;
    reviewCount: number;
  };
}

export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  areaServed?: string[];
  serviceType?: string[];
}

export interface ServiceSchema {
  name: string;
  description: string;
  provider: {
    name: string;
  };
  areaServed: string;
  priceSpecification?: {
    price: number;
    priceCurrency: string;
  };
  deliveryTime?: string;
}

export function generateAgentCardSchema(data: AgentCardSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    ...(data.image && { "image": data.image }),
    "category": data.category || "AI Service",
    "offers": {
      "@type": "Offer",
      "price": data.price || 0,
      "priceCurrency": data.priceCurrency || "ZAR",
      "availability": data.availability || "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0],
    },
    ...(data.areaServed && {
      "areaServed": {
        "@type": data.areaServed.type || "Place",
        "name": data.areaServed.name,
      },
    }),
    ...(data.provider && {
      "provider": {
        "@type": "Organization",
        "name": data.provider.name,
        ...(data.provider.url && { "url": data.provider.url }),
      },
    }),
    ...(data.review && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.review.ratingValue,
        "bestRating": data.review.bestRating,
        "reviewCount": data.review.reviewCount,
      },
    }),
  };
}

export function generateLocalBusinessSchema(data: LocalBusinessSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    ...(data.telephone && { "telephone": data.telephone }),
    ...(data.email && { "email": data.email }),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry,
    },
    ...(data.geo && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": data.geo.latitude,
        "longitude": data.geo.longitude,
      },
    }),
    ...(data.openingHours && { "openingHours": data.openingHours }),
    ...(data.priceRange && { "priceRange": data.priceRange }),
    ...(data.areaServed && { "areaServed": data.areaServed }),
    ...(data.serviceType && { "serviceType": data.serviceType }),
  };
}

export function generateServiceSchema(data: ServiceSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "provider": {
      "@type": "Organization",
      "name": data.provider.name,
    },
    "areaServed": data.areaServed,
    ...(data.priceSpecification && {
      "offers": {
        "@type": "Offer",
        "price": data.priceSpecification.price,
        "priceCurrency": data.priceSpecification.priceCurrency,
      },
    }),
    ...(data.deliveryTime && { "deliveryTime": data.deliveryTime }),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer: {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateOrganizationSchema(org: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "url": org.url,
    ...(org.logo && { "logo": org.logo }),
    ...(org.description && { "description": org.description }),
    ...(org.sameAs && { "sameAs": org.sameAs }),
  };
}

export function generateWebsiteSchema(siteName: string, url: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
