import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/session-store';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Hardcoded admin credentials
    const ADMIN_USERNAME = "Admin";
    const ADMIN_PASSWORD = "admin@123";
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }
    
    // Check admin credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials" },
        { status: 401 }
      );
    }
    
    // Create session
    const sessionId = sessionStore.createSession('admin');
    
    // Create response with session cookie
    const response = NextResponse.json({ success: true });
    
    // Set session cookie
    response.cookies.set({
      name: 'admin-session-id',
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('API signin error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}