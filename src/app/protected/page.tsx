
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { checkSimpleAuth } from "@/actions/simple-auth";
import { sessionStore } from "@/lib/session-store";
import { cookies } from "next/headers";
import { AdminTabs } from "@/components/admin-tabs";

export default async function ProtectedPage() {
  // Check both authentication methods
  let isAuthenticated = false;
  
  try {
    // Check API session first (most reliable)
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin-session-id')?.value;
    if (sessionId) {
      const session = sessionStore.getSession(sessionId);
      if (session) {
        isAuthenticated = true;
      }
    }
    
    // If API session fails, check simple auth
    if (!isAuthenticated) {
      isAuthenticated = await checkSimpleAuth();
    }
    
    // If simple auth fails, try Supabase
    if (!isAuthenticated) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      isAuthenticated = !!user;
    }
  } catch (error) {
    console.log('Auth check error:', error);
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      <AdminTabs />
    </div>
  );
}
