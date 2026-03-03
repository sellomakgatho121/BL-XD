import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, keywords, tone, category, targetAudience, wordCount } = body;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const blogPost = await generateBlogPost({
      topic,
      keywords,
      tone: tone || 'professional',
      category: category || 'insights',
      targetAudience,
      wordCount,
    });

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}
