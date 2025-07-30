import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { sessionStore } from "@/lib/session-store";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Check for API session first (most reliable)
    const sessionId = request.cookies.get('admin-session-id');
    let hasApiAuth = false;
    if (sessionId?.value) {
      const session = sessionStore.getSession(sessionId.value);
      hasApiAuth = !!session;
    }
    
    // Check for simple auth session (fallback)
    const simpleSession = request.cookies.get('admin-session');
    const hasSimpleAuth = simpleSession?.value === 'authenticated';

    // Try Supabase auth if environment variables are available
    let hasSupabaseAuth = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              getAll() {
                return request.cookies.getAll();
              },
              setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                  request.cookies.set(name, value),
                );
                response = NextResponse.next({
                  request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                  response.cookies.set(name, value, options),
                );
              },
            },
          },
        );

        const user = await supabase.auth.getUser();
        hasSupabaseAuth = !user.error;
      } catch (supabaseError) {
        console.log('Supabase not available, using simple auth');
      }
    }

    // Check if user is authenticated (any method)
    const isAuthenticated = hasApiAuth || hasSupabaseAuth || hasSimpleAuth;

    // Protected routes - redirect to home page if not authenticated
    if ((request.nextUrl.pathname.startsWith("/protected") || request.nextUrl.pathname.startsWith("/admin")) && !isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);
    // Allow access but log the error
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};