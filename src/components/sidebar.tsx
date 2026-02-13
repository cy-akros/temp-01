"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Globe,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Taiwan ETFs",
    href: "/dashboard/taiwan",
    icon: TrendingUp,
  },
  {
    label: "Hong Kong ETFs",
    href: "/dashboard/hongkong",
    icon: BarChart3,
  },
  {
    label: "Comparison",
    href: "/dashboard/comparison",
    icon: Globe,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border-primary bg-bg-secondary">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border-primary px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-primary bg-bg-tertiary">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-amber)"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <span className="font-display text-lg text-text-primary">
            Observatory
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Markets
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-accent-amber/10 text-accent-amber border border-accent-amber/20"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-transparent"
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span className="flex-1 font-body">{item.label}</span>
              {isActive && (
                <ChevronRight size={14} className="text-accent-amber/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border-primary p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-primary bg-bg-tertiary font-mono text-xs text-accent-amber">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm text-text-primary">{user?.name}</p>
            <p className="truncate font-mono text-[10px] text-text-muted">
              {user?.email}
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg-tertiary hover:text-accent-red"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
