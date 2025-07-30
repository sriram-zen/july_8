"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Simple authentication without Supabase dependency for fallback
export const simpleSignInAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  
  // Hardcoded admin credentials
  const ADMIN_USERNAME = "Admin";
  const ADMIN_PASSWORD = "admin@123";
  
  if (!username || !password) {
    return { success: false, error: "Username and password are required" };
  }
  
  // Check admin credentials
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { success: false, error: "Invalid admin credentials" };
  }
  
  try {
    // Create a simple session cookie with proper error handling
    const cookieStore = await cookies();
    
    // Set the session cookie with proper configuration
    cookieStore.set({
      name: 'admin-session',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    return { success: true };
  } catch (err) {
    console.error('Simple auth error:', err);
    // Try a simpler approach if the above fails
    try {
      const cookieStore = await cookies();
      cookieStore.set('admin-session', 'authenticated');
      return { success: true };
    } catch (fallbackErr) {
      console.error('Fallback auth error:', fallbackErr);
      return { success: false, error: "Session creation failed. Please check server configuration." };
    }
  }
};

export const simpleSignOutAction = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin-session');
  } catch (err) {
    console.error('Sign out error:', err);
  }
  redirect("/");
};

export const checkSimpleAuth = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    return session?.value === 'authenticated';
  } catch (err) {
    console.error('Auth check error:', err);
    return false;
  }
};