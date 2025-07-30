import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminTabs } from "@/components/admin-tabs";
import { cookies } from "next/headers";

export default async function AdminPage() {
  // Check multiple authentication methods
  const supabase = await createClient();
  const cookieStore = await cookies();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const simpleAuth = cookieStore.get('simple-auth')?.value;
  const sessionCookie = cookieStore.get('admin-session')?.value;

  // Redirect to main site if not authenticated via any method
  if (!user && !simpleAuth && !sessionCookie) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-foreground">Admin Portal</h1>
          <div className="text-sm text-muted-foreground">
            Seetha Rama Vivaha Trust
          </div>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <AdminTabs />
      </div>
      <footer className="border-t border-border p-4 mt-auto">
        <div className="container mx-auto text-center text-xs text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://alchemistudio.ai"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Alchemi
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}