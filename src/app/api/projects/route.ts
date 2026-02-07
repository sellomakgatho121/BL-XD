import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

    // Build query based on role
    let query = supabase
      .from('projects')
      .select(`
        *,
        client:profiles!client_id(id, full_name, email, company_name),
        phases:project_phases(*)
      `)
      .order('created_at', { ascending: false });

    if (!isAdmin) {
      query = query.eq('client_id', user.id);
    }

    const { data: projects, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        client_id: body.client_id,
        name: body.name,
        description: body.description,
        tier: body.tier,
        status: body.status || 'planning',
        progress: body.progress || 0,
        budget: body.budget,
        start_date: body.start_date,
        due_date: body.due_date,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Create default phases based on tier
    const defaultPhases = getDefaultPhases(body.tier);
    
    const phasesWithProjectId = defaultPhases.map((phase, index) => ({
      project_id: project.id,
      name: phase.name,
      description: phase.description,
      order_index: index,
    }));

    await supabase.from('project_phases').insert(phasesWithProjectId);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getDefaultPhases(tier: string) {
  const basePhases = [
    { name: 'Discovery & Research', description: 'Understanding your business, goals, and constraints' },
    { name: 'Design & Wireframing', description: 'Creating layouts and visual concepts' },
    { name: 'Development', description: 'Building your site with clean, optimized code' },
    { name: 'Testing & QA', description: 'Cross-browser testing and performance optimization' },
    { name: 'Launch', description: 'Deploying your site to production' },
  ];

  if (tier === 'shop') {
    return [
      ...basePhases.slice(0, 2),
      { name: 'E-commerce Setup', description: 'Configuring products, payments, and shipping' },
      ...basePhases.slice(2),
    ];
  }

  return basePhases;
}
