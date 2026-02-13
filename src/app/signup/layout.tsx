import { AuthProvider } from "@/context/auth-context";

export const dynamic = "force-dynamic";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
