import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const industry = searchParams.get('industry');
  const tier = searchParams.get('tier');
  const sort = searchParams.get('sort') || 'created_at';
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  const supabase = await createClient();

  let query = supabase
    .from('portfolio_items')
    .select('*')
    .eq('published', true);

  if (industry && industry !== 'All') {
    query = query.eq('industry', industry);
  }
  if (tier && tier !== 'All') {
    query = query.eq('tier', tier);
  }

  query = query.order(sort, { ascending: false }).limit(limit);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
