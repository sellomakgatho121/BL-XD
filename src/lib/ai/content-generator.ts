import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export type ContentTone = 'professional' | 'casual' | 'technical' | 'friendly' | 'authoritative';
export type ContentType = 'blog' | 'social' | 'marketing' | 'seo' | 'email';

export interface BlogPostInput {
  topic?: string;
  keywords?: string[];
  projectData?: {
    projectName: string;
    industry: string;
    services: string[];
  };
  tone: ContentTone;
  targetAudience?: string;
  wordCount?: number;
  category?: string;
}

export interface BlogPostOutput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  readTime: number;
  category: string;
}

export interface SocialPostInput {
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook';
  topic?: string;
  keywords?: string[];
  tone: ContentTone;
  includeHashtags: boolean;
  maxLength?: number;
}

export interface SocialPostOutput {
  mainText: string;
  caption: string;
  hashtags: string[];
  emoji: boolean;
}

export interface SEOAnalysisInput {
  content: string;
  targetKeywords: string[];
  title: string;
  metaDescription: string;
}

export interface SEOSuggestion {
  type: 'title' | 'meta' | 'content' | 'keyword' | 'readability' | 'structure';
  priority: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  fix: string;
}

export interface SEOAnalysisOutput {
  score: number; // 0-100
  suggestions: SEOSuggestion[];
  keywordDensity: Record<string, number>;
  readabilityScore: number;
  wordCount: number;
}

export interface ContentTemplate {
  id: string;
  name: string;
  type: ContentType;
  structure: string;
  description: string;
}

// Content templates
export const contentTemplates: ContentTemplate[] = [
  {
    id: 'blog-educational',
    name: 'Educational Blog Post',
    type: 'blog',
    structure: '# [Title]\n\n## Introduction\n[Brief overview of topic and why it matters]\n\n## Key Point 1\n[Explanation with examples]\n\n## Key Point 2\n[Explanation with examples]\n\n## Key Point 3\n[Explanation with examples]\n\n## Conclusion\n[Summary and call to action]',
    description: 'Perfect for teaching and sharing knowledge',
  },
  {
    id: 'blog-howto',
    name: 'How-To Guide',
    type: 'blog',
    structure: '# [Title]: A Complete Guide\n\n## What You\'ll Learn\n[Bullet points of key takeaways]\n\n## Step 1: [First Step]\n[Detailed instructions]\n\n## Step 2: [Second Step]\n[Detailed instructions]\n\n## Step 3: [Third Step]\n[Detailed instructions]\n\n## Pro Tips\n[Additional insights and best practices]',
    description: 'Step-by-step instructional content',
  },
  {
    id: 'blog-case-study',
    name: 'Case Study',
    type: 'blog',
    structure: '# [Client Name]: How We [Result]\n\n## The Challenge\n[Describe the problem or opportunity]\n\n## Our Approach\n[Explain the solution and methodology]\n\n## The Results\n[Quantify outcomes with metrics]\n\n## Key Takeaways\n[Lessons learned for future projects]',
    description: 'Showcase successful projects and results',
  },
  {
    id: 'social-twitter',
    name: 'Twitter Post',
    type: 'social',
    structure: '[Hook line]\n\n[Main point with key insight]\n\n[Call to action or question]\n\n#hashtags',
    description: 'Engaging Twitter posts with hashtags',
  },
  {
    id: 'social-linkedin',
    name: 'LinkedIn Post',
    type: 'social',
    structure: '[Engaging opening hook]\n\n[2-3 paragraphs of valuable content]\n\n[Bullet points for easy scanning]\n\n[Engaging question or call to action]',
    description: 'Professional LinkedIn posts for business audiences',
  },
  {
    id: 'social-instagram',
    name: 'Instagram Caption',
    type: 'social',
    structure: '[Short, punchy hook]\n\n[Main content with emojis]\n\n[Call to action]\n\n#hashtags #for #visibility',
    description: 'Visual-friendly Instagram captions',
  },
  {
    id: 'marketing-product',
    name: 'Product Launch',
    type: 'marketing',
    structure: '# Introducing [Product Name]\n\n## The Problem\n[Describe pain points]\n\n## The Solution\n[Present your product]\n\n## Key Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Get Started\n[Call to action with link]',
    description: 'Product announcement and promotion',
  },
  {
    id: 'email-newsletter',
    name: 'Newsletter',
    type: 'email',
    structure: '[Personal greeting],\n\n[Quick hook or insight]\n\n\n## This Week\'s Highlights\n\n[Content block 1]\n\n[Content block 2]\n\n\n## Quick Tip\n[ actionable tip]\n\n\n[Closing and next steps]',
    description: 'Regular email newsletter format',
  },
];

/**
 * Generate a complete blog post with all metadata
 */
export async function generateBlogPost(input: BlogPostInput): Promise<BlogPostOutput> {
  const prompt = buildBlogPrompt(input);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert content writer for Blacklight Web Designs, a web development agency. 
Write engaging, SEO-optimized blog posts that are ${input.tone} in tone.
Always respond with valid JSON in the following format:
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "excerpt": "2-3 sentence summary",
  "content": "Full markdown blog post with proper headings",
  "metaTitle": "SEO optimized title (50-60 chars)",
  "metaDescription": "SEO description (150-160 chars)",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": 5,
  "category": "category-name"
}`
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);

    return {
      title: parsed.title || 'Untitled Post',
      slug: parsed.slug || generateSlug(parsed.title),
      excerpt: parsed.excerpt || '',
      content: parsed.content || '',
      metaTitle: parsed.metaTitle || parsed.title,
      metaDescription: parsed.metaDescription || parsed.excerpt,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      readTime: parsed.readTime || 5,
      category: parsed.category || 'insights',
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post. Please try again.');
  }
}

/**
 * Build the prompt for blog post generation
 */
function buildBlogPrompt(input: BlogPostInput): string {
  let prompt = `Generate a blog post with the following specifications:\n\n`;
  prompt += `Tone: ${input.tone}\n`;

  if (input.topic) {
    prompt += `Topic: ${input.topic}\n`;
  }

  if (input.projectData) {
    prompt += `Context: ${input.projectData.projectName} in the ${input.projectData.industry} industry. Services: ${input.projectData.services.join(', ')}\n`;
  }

  if (input.keywords && input.keywords.length > 0) {
    prompt += `Keywords to include: ${input.keywords.join(', ')}\n`;
  }

  if (input.targetAudience) {
    prompt += `Target Audience: ${input.targetAudience}\n`;
  }

  if (input.wordCount) {
    prompt += `Target word count: ${input.wordCount}\n`;
  } else {
    prompt += `Target word count: 800-1200\n`;
  }

  return prompt;
}

/**
 * Generate social media post
 */
export async function generateSocialPost(input: SocialPostInput): Promise<SocialPostOutput> {
  const prompt = buildSocialPrompt(input);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a social media expert for Blacklight Web Designs.
Create engaging ${input.platform} posts that are ${input.tone} in tone.
Always respond with valid JSON in the following format:
{
  "mainText": "Main headline or hook",
  "caption": "Full caption with engaging content",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
  "emoji": true
}`
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);

    return {
      mainText: parsed.mainText || '',
      caption: parsed.caption || '',
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
      emoji: parsed.emoji ?? true,
    };
  } catch (error) {
    console.error('Error generating social post:', error);
    throw new Error('Failed to generate social post. Please try again.');
  }
}

/**
 * Build the prompt for social media generation
 */
function buildSocialPrompt(input: SocialPostInput): string {
  let prompt = `Generate a ${input.platform} post with the following specifications:\n\n`;
  prompt += `Tone: ${input.tone}\n`;

  if (input.topic) {
    prompt += `Topic: ${input.topic}\n`;
  }

  if (input.keywords && input.keywords.length > 0) {
    prompt += `Keywords: ${input.keywords.join(', ')}\n`;
  }

  if (input.maxLength) {
    prompt += `Maximum length: ${input.maxLength} characters\n`;
  }

  if (input.includeHashtags) {
    prompt += `Include relevant hashtags\n`;
  }

  return prompt;
}

/**
 * Analyze content for SEO
 */
export async function analyzeSEO(input: SEOAnalysisInput): Promise<SEOAnalysisOutput> {
  const suggestions: SEOSuggestion[] = [];
  let score = 100;

  // Analyze title
  if (input.title.length < 30) {
    suggestions.push({
      type: 'title',
      priority: 'medium',
      issue: 'Title is too short',
      suggestion: 'Aim for 50-60 characters',
      fix: 'Expand title with more descriptive keywords',
    });
    score -= 10;
  } else if (input.title.length > 60) {
    suggestions.push({
      type: 'title',
      priority: 'medium',
      issue: 'Title is too long',
      suggestion: 'Keep under 60 characters for Google',
      fix: 'Shorten title while keeping key keywords',
    });
    score -= 5;
  }

  if (!input.targetKeywords.some(kw => input.title.toLowerCase().includes(kw.toLowerCase()))) {
    suggestions.push({
      type: 'title',
      priority: 'high',
      issue: 'Primary keyword not in title',
      suggestion: 'Include your main keyword in the title',
      fix: 'Add target keyword to title naturally',
    });
    score -= 15;
  }

  // Analyze meta description
  if (input.metaDescription.length < 120) {
    suggestions.push({
      type: 'meta',
      priority: 'medium',
      issue: 'Meta description is too short',
      suggestion: 'Aim for 150-160 characters',
      fix: 'Add more compelling copy with keywords',
    });
    score -= 10;
  } else if (input.metaDescription.length > 160) {
    suggestions.push({
      type: 'meta',
      priority: 'low',
      issue: 'Meta description may be truncated',
      suggestion: 'Keep under 160 characters',
      fix: 'Shorten meta description',
    });
    score -= 5;
  }

  // Analyze content
  const wordCount = input.content.split(/\s+/).length;
  if (wordCount < 300) {
    suggestions.push({
      type: 'content',
      priority: 'medium',
      issue: 'Content is too short',
      suggestion: 'Aim for at least 300 words',
      fix: 'Expand content with more detail and examples',
    });
    score -= 10;
  }

  // Keyword density analysis
  const keywordDensity: Record<string, number> = {};
  const contentLower = input.content.toLowerCase();
  const totalWords = wordCount;

  input.targetKeywords.forEach(keyword => {
    const matches = (contentLower.match(new RegExp(keyword.toLowerCase(), 'gi')) || []).length;
    const density = (matches / totalWords) * 100;
    keywordDensity[keyword] = Math.round(density * 100) / 100;

    if (matches === 0) {
      suggestions.push({
        type: 'keyword',
        priority: 'high',
        issue: `Keyword "${keyword}" not found in content`,
        suggestion: 'Include target keywords naturally in content',
        fix: `Add "${keyword}" to the content`,
      });
      score -= 15;
    } else if (density > 3) {
      suggestions.push({
        type: 'keyword',
        priority: 'medium',
        issue: `Keyword "${keyword}" density is too high (${density.toFixed(2)}%)`,
        suggestion: 'Keep keyword density between 1-2%',
        fix: 'Reduce keyword usage while maintaining natural flow',
      });
      score -= 5;
    }
  });

  // Check for headings
  if (!input.content.match(/^#+\s/gm)) {
    suggestions.push({
      type: 'structure',
      priority: 'medium',
      issue: 'No headings found in content',
      suggestion: 'Use H2 and H3 headings to structure content',
      fix: 'Add descriptive headings to break up content',
    });
    score -= 10;
  }

  // Readability check (simple Flesch-like calculation)
  const sentences = input.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = wordCount / (sentences.length || 1);
  const avgSyllables = estimateSyllables(input.content) / (wordCount || 1);
  const readabilityScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllables;

  if (avgWordsPerSentence > 25) {
    suggestions.push({
      type: 'readability',
      priority: 'low',
      issue: 'Sentences are too long on average',
      suggestion: 'Break long sentences into shorter ones',
      fix: 'Aim for 15-20 words per sentence',
    });
    score -= 5;
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    suggestions,
    keywordDensity,
    readabilityScore: Math.round(readabilityScore * 10) / 10,
    wordCount,
  };
}

/**
 * Estimate syllables in text
 */
function estimateSyllables(text: string): number {
  const words = text.split(/\s+/);
  let syllables = 0;

  words.forEach(word => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) {
      syllables += 1;
    } else {
      const vowelGroups = word.match(/[aeiouy]+/g);
      syllables += vowelGroups ? vowelGroups.length : 1;
    }
  });

  return syllables;
}

/**
 * Generate URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate content variations for A/B testing
 */
export async function generateVariations(
  content: string,
  type: 'title' | 'headline' | 'cta',
  count: number = 3
): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a copywriter. Generate ${count} variations of the provided ${type}. 
Respond with a JSON array of strings.`,
        },
        {
          role: 'user',
          content: `Generate ${count} variations for this ${type}:\n\n${content}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 300,
    });

    const result = response.choices[0]?.message?.content || '[]';
    const parsed = JSON.parse(result);
    return Array.isArray(parsed) ? parsed : [content];
  } catch (error) {
    console.error('Error generating variations:', error);
    return [content];
  }
}

/**
 * Get AI suggestions for improvement
 */
export async function getSuggestions(
  content: string,
  type: ContentType
): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert content editor. Review the ${type} content and provide 3-5 specific, actionable suggestions for improvement.
Respond with a JSON array of strings.`,
        },
        {
          role: 'user',
          content: content,
        },
      ],
      temperature: 0.5,
      max_tokens: 400,
    });

    const result = response.choices[0]?.message?.content || '[]';
    return JSON.parse(result);
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
}
