// Sign in page removed. Redirecting to dashboard.
import { redirect } from "next/navigation";

export default function SignInPage() {
  redirect("/dashboard");
  return null;
}
