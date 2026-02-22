import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirectTo = requestUrl.searchParams.get('redirectedFrom') || '/portal/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check user role to determine redirect
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'admin' || profile?.role === 'superadmin') {
          return NextResponse.redirect(new URL('/admin/dashboard', requestUrl.origin));
        }
      }

      return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
    }
  }

  // Auth code exchange failed - redirect to login with error
  return NextResponse.redirect(
    new URL('/login?error=auth_callback_failed', requestUrl.origin)
  );
}
