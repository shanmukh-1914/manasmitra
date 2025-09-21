// Sign up page removed. Redirecting to dashboard.
import { redirect } from "next/navigation";

export default function SignUpPage() {
  redirect("/dashboard");
  return null;
}
