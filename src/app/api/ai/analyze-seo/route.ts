import { NextRequest, NextResponse } from 'next/server';
import { analyzeSEO } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, metaDescription, content, targetKeywords } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeSEO({
      title,
      metaDescription: metaDescription || '',
      content,
      targetKeywords: targetKeywords || [],
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing SEO:', error);
    return NextResponse.json(
      { error: 'Failed to analyze SEO' },
      { status: 500 }
    );
  }
}
