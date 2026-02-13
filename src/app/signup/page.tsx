"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const ALLOWED_DOMAIN = "akrostec.com";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase();
    return domain === ALLOWED_DOMAIN;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 도메인 검증
    if (!validateEmail(email)) {
      setError(`@${ALLOWED_DOMAIN} 이메일 주소만 가입할 수 있습니다.`);
      return;
    }

    // 비밀번호 확인
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (signupError) {
      if (signupError.message.includes("akrostec.com")) {
        setError(`@${ALLOWED_DOMAIN} 이메일 주소만 가입할 수 있습니다.`);
      } else {
        setError(signupError.message);
      }
    } else {
      setSuccess(true);
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
        <div className="mb-10 text-center">
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
            Sign Up
          </h1>
          <p className="mt-2 font-mono text-sm tracking-wide text-text-muted">
            @{ALLOWED_DOMAIN} 계정으로 가입
          </p>
        </div>

        {success ? (
          /* 가입 성공 — 이메일 확인 안내 */
          <div className="glow-border rounded-2xl border border-border-primary bg-bg-card p-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent-green/20 bg-accent-green-dim">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-green)"
                strokeWidth="2"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
            <h2 className="mb-2 font-display text-2xl text-text-primary">
              인증 메일 발송 완료
            </h2>
            <p className="mb-2 font-body text-sm text-text-secondary">
              <span className="font-medium text-accent-amber">{email}</span>
              로 인증 메일을 보냈습니다.
            </p>
            <p className="mb-6 font-mono text-xs text-text-muted">
              메일함을 확인하고 인증 링크를 클릭해주세요.
            </p>
            <Link
              href="/login"
              className="inline-flex rounded-lg border border-accent-amber/30 bg-accent-amber/10 px-6 py-2.5 font-body text-sm font-medium text-accent-amber transition-all hover:bg-accent-amber/20"
            >
              로그인 페이지로 이동
            </Link>
          </div>
        ) : (
          /* 가입 폼 */
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
                    placeholder={`name@${ALLOWED_DOMAIN}`}
                    required
                  />
                  <p className="mt-1.5 font-mono text-[10px] text-text-muted">
                    @{ALLOWED_DOMAIN} 이메일만 가입 가능
                  </p>
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
                    placeholder="최소 6자"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-amber/50 focus:ring-1 focus:ring-accent-amber/20"
                    placeholder="비밀번호 확인"
                    required
                    minLength={6}
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
                      처리 중...
                    </span>
                  ) : (
                    "가입 신청"
                  )}
                </button>
              </div>
            </div>

            <p className="text-center font-mono text-xs text-text-muted">
              이미 계정이 있나요?{" "}
              <Link
                href="/login"
                className="text-accent-amber transition-colors hover:underline"
              >
                로그인
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
