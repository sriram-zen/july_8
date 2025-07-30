"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Sign up functionality removed - Admin-only access

export const signInAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  
  // Hardcoded admin credentials for admin-only access
  const ADMIN_USERNAME = "Admin";
  const ADMIN_PASSWORD = "admin@123";
  
  if (!username || !password) {
    return { success: false, error: "Username and password are required" };
  }
  
  // Check admin credentials
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { success: false, error: "Invalid admin credentials" };
  }
  
  // Create a session using Supabase with our fixed admin user
  const supabase = await createClient();
  
  // Try to sign in with the fixed admin email
  const ADMIN_EMAIL = "admin@donation-system.local";
  const ADMIN_SUPABASE_PASSWORD = "SecureAdminPass2024!";
  
  try {
    let { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_SUPABASE_PASSWORD,
    });

    if (error) {
      // If the admin user doesn't exist, create it
      const { error: signUpError } = await supabase.auth.signUp({
        email: ADMIN_EMAIL, 
        password: ADMIN_SUPABASE_PASSWORD,
        options: {
          data: {
            username: "Admin",
            role: "admin",
            display_name: "System Administrator"
          }
        }
      });
      
      if (signUpError && signUpError.message !== 'User already registered') {
        console.error('Admin user creation error:', signUpError);
        return { success: false, error: "Failed to create admin user. Please check Supabase configuration." };
      }
      
      // Try to sign in again after creating the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_SUPABASE_PASSWORD,
      });
      
      if (signInError) {
        console.error('Admin sign in error:', signInError);
        return { success: false, error: "Failed to sign in admin user. Please check Supabase configuration." };
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected auth error:', err);
    return { success: false, error: "Unexpected authentication error occurred." };
  }
};

// Forgot password functionality removed - Admin-only access with fixed credentials

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
