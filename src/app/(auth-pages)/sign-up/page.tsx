// This page has been removed - Sign up functionality is disabled for admin-only access
// Redirect to sign-in page
import { redirect } from "next/navigation";

export default function SignupRedirect() {
  redirect("/sign-in");
}
