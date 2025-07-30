
"use client";

import { useState } from "react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { AdminSignInModal } from "./admin-signin-modal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { simpleSignOutAction } from "@/actions/simple-auth";
import { clientAuth } from "@/lib/client-auth";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check auth status using the new client auth helper
        const isAuthenticated = await clientAuth.checkAuth();
        if (isAuthenticated) {
          setUser({ email: 'admin@donation-system.local' }); // Mock user for authenticated session
          setLoading(false);
          return;
        }
        
        // Then try Supabase auth as fallback
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.log('Auth check failed, user not authenticated');
        setUser(null);
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes (Supabase only)
    try {
      const supabase = createClient();
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.log('Supabase auth listener not available');
    }
  }, []);

  const handleSignOut = async () => {
    try {
      // Sign out from all systems
      await clientAuth.signOut();
      const supabase = createClient();
      await supabase.auth.signOut();
      await simpleSignOutAction();
    } catch (error) {
      console.log('Sign out error:', error);
    }
    setUser(null);
    router.push("/");
  };

  const handleSignInSuccess = () => {
    setIsModalOpen(false);
    // User state will be updated via the auth state listener
  };

  if (loading) {
    return <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>;
  }

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <div>
          <Badge
            variant={"default"}
            className="font-normal pointer-events-none"
          >
            Please update .env.local file with anon key and url
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={"outline"}
            disabled
            className="opacity-75 cursor-none pointer-events-none"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-foreground">Admin</span>
          <Button 
            type="button" 
            variant={"outline"} 
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={"default"}
            onClick={() => setIsModalOpen(true)}
          >
            Admin Sign in
          </Button>
        </div>
      )}
      
      <AdminSignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSignInSuccess}
      />
    </>
  );
}
