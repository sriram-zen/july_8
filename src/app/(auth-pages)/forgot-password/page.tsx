// Forgot password functionality disabled for admin-only access
import { redirect } from "next/navigation";

export default function ForgotPasswordRedirect() {
  redirect("/sign-in");
}
