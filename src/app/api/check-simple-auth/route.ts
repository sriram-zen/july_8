import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';

export async function GET(request: NextRequest) {
  try {
    // First try the new session store approach
    const sessionId = request.cookies.get('admin-session-id')?.value;
    if (sessionId) {
      const session = sessionStore.getSession(sessionId);
      if (session) {
        return NextResponse.json({ authenticated: true });
      }
    }
    
    // Fallback to old cookie approach
    const cookieStore = await cookies();
    const oldSession = cookieStore.get('admin-session');
    const authenticated = oldSession?.value === 'authenticated';
    
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}