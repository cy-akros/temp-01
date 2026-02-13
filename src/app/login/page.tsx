"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const errorMsg = await login(email, password);
    if (!errorMsg) {
      router.push("/dashboard");
    } else {
      setError(errorMsg);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-amber) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-amber) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, var(--accent-amber-dim) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="animate-fade-in-up relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border-primary bg-bg-secondary">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-amber)"
              strokeWidth="1.5"
            >
              <path d="M2 12L12 2l10 10M4 10v10a1 1 0 001 1h4v-6h6v6h4a1 1 0 001-1V10" />
            </svg>
          </div>
          <h1 className="font-display text-4xl tracking-tight text-text-primary">
            ETF Observatory
          </h1>
          <p className="mt-2 font-mono text-sm tracking-wide text-text-muted">
            TW & HK Market Analytics
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="glow-border overflow-hidden rounded-2xl border border-border-primary bg-bg-card p-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-amber/50 focus:ring-1 focus:ring-accent-amber/20"
                  placeholder="admin@observatory.io"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-amber/50 focus:ring-1 focus:ring-accent-amber/20"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="rounded-lg border border-accent-red/20 bg-accent-red-dim px-4 py-3 font-mono text-xs text-accent-red">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer relative w-full rounded-lg border border-accent-amber/30 bg-accent-amber/10 py-3 font-body text-sm font-medium tracking-wide text-accent-amber transition-all hover:bg-accent-amber/20 hover:border-accent-amber/50 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                      <path
                        d="M12 2a10 10 0 0110 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>

          <p className="text-center font-mono text-xs text-text-muted">
            계정이 없나요?{" "}
            <Link
              href="/signup"
              className="text-accent-amber transition-colors hover:underline"
            >
              가입 신청
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
