import { supabaseAdmin } from '@/lib/supabase/server';

export interface ServiceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  category: string;
  featured: boolean;
}

const SERVICES: ServiceProduct[] = [
  {
    id: 'whatsapp-storefront',
    name: 'WhatsApp AI Storefront',
    description: 'Your 24/7 AI sales agent on WhatsApp',
    price: 12000,
    features: [
      'WhatsApp Business API',
      'AI conversation engine',
      'Local language support',
      'Zapper & SnapScan payments',
      'Product catalog',
    ],
    category: 'e-commerce',
    featured: true,
  },
  {
    id: 'ai-landing',
    name: 'AI Landing + GEO',
    description: 'AI-optimized landing pages',
    price: 4500,
    features: [
      'AgentCard schema',
      'AI search optimization',
      'Mobile-first PWA',
      '48-hour delivery',
    ],
    category: 'marketing',
    featured: false,
  },
  {
    id: 'silicon-workforce',
    name: 'Silicon Workforce',
    description: 'Full AI operations team',
    price: 15000,
    features: [
      'Content agent',
      'Sales agent',
      'Support agent',
      'Analytics dashboard',
    ],
    category: 'enterprise',
    featured: false,
  },
  {
    id: 'video-engine',
    name: 'Video Content Engine',
    description: '60 videos/month for social media',
    price: 6000,
    features: [
      'AI video generation',
      'Multi-platform publishing',
      'Trend analysis',
      'Analytics',
    ],
    category: 'marketing',
    featured: false,
  },
  {
    id: 'liquid-ui',
    name: 'Liquid UI App',
    description: 'Mobile-first Progressive Web App',
    price: 25000,
    features: [
      'PWA development',
      'Push notifications',
      'Offline capable',
      'Native feel',
    ],
    category: 'development',
    featured: false,
  },
];

export async function getServices(): Promise<ServiceProduct[]> {
  return SERVICES;
}

export async function getServiceById(id: string): Promise<ServiceProduct | undefined> {
  return SERVICES.find(s => s.id === id);
}

export async function getFeaturedServices(): Promise<ServiceProduct[]> {
  return SERVICES.filter(s => s.featured);
}

export async function getServicesByCategory(category: string): Promise<ServiceProduct[]> {
  return SERVICES.filter(s => s.category === category);
}

export function formatServiceForWhatsApp(service: ServiceProduct): string {
  const features = service.features.slice(0, 4).map(f => `• ${f}`).join('\n');

  return `*${service.name}*\n${service.description}\n\n*Price:* R${service.price.toLocaleString()}\n\n*Features:*\n${features}`;
}

export function formatCatalogForWhatsApp(services: ServiceProduct[]): string {
  const formatted = services.map((s, i) => {
    return `${i + 1}. *${s.name}* - R${s.price.toLocaleString()}`;
  }).join('\n');

  return `*Our Services:*\n\n${formatted}\n\nReply with the number to learn more!`;
}
