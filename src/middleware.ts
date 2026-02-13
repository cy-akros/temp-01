import { type NextRequest, NextResponse } from "next/server";

// Supabase 연동 시 아래 주석 해제하고 사용
// import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(_request: NextRequest) {
  // TODO: Supabase 연동 시 활성화
  // return await updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
