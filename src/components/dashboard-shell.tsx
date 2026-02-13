"use client";

import { AuthGuard } from "./auth-guard";
import { Sidebar } from "./sidebar";
import { type ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-bg-primary">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
