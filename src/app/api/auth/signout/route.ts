import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('admin-session-id')?.value;
    
    if (sessionId) {
      sessionStore.deleteSession(sessionId);
    }
    
    // Create response
    const response = NextResponse.json({ success: true });
    
    // Clear session cookie
    response.cookies.set({
      name: 'admin-session-id',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('API signout error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}