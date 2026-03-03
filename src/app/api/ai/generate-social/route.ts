import { NextRequest, NextResponse } from 'next/server';
import { generateSocialPost } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, topic, keywords, tone, includeHashtags, maxLength } = body;

    if (!platform || !topic) {
      return NextResponse.json(
        { error: 'Platform and topic are required' },
        { status: 400 }
      );
    }

    const socialPost = await generateSocialPost({
      platform,
      topic,
      keywords,
      tone: tone || 'professional',
      includeHashtags: includeHashtags !== undefined ? includeHashtags : true,
      maxLength,
    });

    return NextResponse.json(socialPost);
  } catch (error) {
    console.error('Error generating social post:', error);
    return NextResponse.json(
      { error: 'Failed to generate social post' },
      { status: 500 }
    );
  }
}
