
// Sign-in page disabled - using modal-based authentication
import { redirect } from "next/navigation";

export default function SignInRedirect() {
  redirect("/");
}
