import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const supabase = await createClient();

  let query = supabase
    .from('blog_posts')
    .select('slug, title, excerpt, published_at, category, read_time, featured_image, profiles(full_name)', { count: 'exact' })
    .eq('status', 'published');

  if (category) {
    query = query.eq('category', category);
  }

  query = query
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data?.map((post) => ({
      ...post,
      profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    })),
    total: count,
  });
}
