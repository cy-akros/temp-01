"use client";

import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  icon?: ReactNode;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className={`animate-fade-in-up delay-${delay} glow-border rounded-xl border border-border-primary bg-bg-card p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            {title}
          </p>
          <p className="mt-2 font-display text-3xl tracking-tight text-text-primary">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 font-mono text-xs text-text-secondary">
              {subtitle}
            </p>
          )}
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`font-mono text-xs font-medium ${
                  change >= 0 ? "text-accent-green" : "text-accent-red"
                }`}
              >
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)}%
              </span>
              <span className="font-mono text-[10px] text-text-muted">
                1M flow
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-primary bg-bg-tertiary text-accent-amber">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
