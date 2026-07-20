import "server-only";

// BL-XD Data Store — in-memory adapter with Neon Postgres fallback
// Works without any external service. Swap to Neon by setting DATABASE_URL.

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
  role: "client" | "admin" | "superadmin";
  avatarUrl?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  tier: "spark" | "growth" | "shop" | "diagnostic";
  status: "planning" | "in_progress" | "review" | "completed" | "cancelled";
  progress: number;
  budget?: number;
  startDate?: string;
  dueDate?: string;
  completedDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  businessType?: string;
  budgetRange?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted" | "archived";
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId?: string;
  clientId: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  notes?: string;
  paymentMethod?: string;
  paidAt?: string;
  createdAt: Date;
  updatedAt: Date;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface TeamMember {
  id: string;
  userId?: string;
  name: string;
  email: string;
  role: "developer" | "designer" | "project_manager" | "sales" | "support" | "admin";
  department: string;
  bio?: string;
  specialties: string[];
  hourlyRate?: number;
  isActive: boolean;
  hireDate: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorId?: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  readTime: number;
  publishedAt?: string;
  createdAt: Date;
  updatedAt: Date;
  metaTitle?: string;
  metaDescription?: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  clientName?: string;
  industry?: string;
  serviceTier?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  results?: { value: string; label: string }[];
  testimonial?: { quote: string; author: string; role: string };
  heroImage?: string;
  galleryImages: string[];
  techStack: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: "message" | "project_update" | "lead" | "system";
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

export interface LeadScore {
  id: string;
  submissionId: string;
  score: number;
  category: "hot" | "warm" | "cold" | "spam";
  analysis: Record<string, unknown>;
  createdAt: Date;
}

// ─── In-Memory Store ───

export class InMemoryStore {
  profiles: Map<string, Profile> = new Map();
  projects: Map<string, Project> = new Map();
  contacts: Map<string, ContactSubmission> = new Map();
  invoices: Map<string, Invoice> = new Map();
  invoiceItems: Map<string, InvoiceItem> = new Map();
  teamMembers: Map<string, TeamMember> = new Map();
  blogPosts: Map<string, BlogPost> = new Map();
  portfolioItems: Map<string, PortfolioItem> = new Map();
  notifications: Map<string, Notification> = new Map();
  leadScores: Map<string, LeadScore> = new Map();

  private nextNum = 1;
  generateId(): string {
    return `bl-${Date.now()}-${this.nextNum++}`;
  }

  generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const seq = this.nextNum++;
    return `INV-${year}-${String(seq).padStart(4, "0")}`;
  }
}

export const store = new InMemoryStore();

// ─── Seed Admin User ───

export function seedAdmin() {
  const existing = Array.from(store.profiles.values()).find(
    (p) => p.email === "sellomakgatho121@gmail.com"
  );
  if (existing) return existing;

  const admin: Profile = {
    id: store.generateId(),
    email: "sellomakgatho121@gmail.com",
    fullName: "Sello Makgatho",
    role: "superadmin",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  store.profiles.set(admin.id, admin);

  // Seed sample blog posts
  const posts = [
    {
      slug: "future-of-ai-web-development",
      title: "The Future of AI in Web Development",
      excerpt: "How artificial intelligence is revolutionizing the way we build and deploy web applications.",
      category: "technology",
      tags: ["AI", "Web Development", "Future Tech"],
      status: "published" as const,
      readTime: 8,
    },
    {
      slug: "why-performance-matters",
      title: "Why Website Performance is Your Best Investment",
      excerpt: "Every second of load time costs you customers. Here's the data that proves it.",
      category: "insights",
      tags: ["Performance", "ROI", "Business"],
      status: "published" as const,
      readTime: 6,
    },
    {
      slug: "design-systems-at-scale",
      title: "Building Design Systems That Scale",
      excerpt: "How to create a design system that grows with your product.",
      category: "design",
      tags: ["Design Systems", "UI/UX", "Scalability"],
      status: "published" as const,
      readTime: 7,
    },
  ];

  for (const p of posts) {
    const post: BlogPost = {
      id: store.generateId(),
      ...p,
      content: `# ${p.title}\n\nFull content for ${p.title}. This is a sample blog post to demonstrate the blog functionality.`,
      authorId: admin.id,
      publishedAt: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.blogPosts.set(post.id, post);
  }

  return admin;
}

// Call seed on import
seedAdmin();
