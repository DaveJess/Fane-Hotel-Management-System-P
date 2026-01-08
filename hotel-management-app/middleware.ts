import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./src/lib/jwt";

const protectedMatchers = ["/dashboard", "/hotels", "/rooms", "/reservations", "/admin"];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Only run on paths that should be protected
  if (!protectedMatchers.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/authentication/login";
    return NextResponse.redirect(url);
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (err) {
    const url = req.nextUrl.clone();
    url.pathname = "/authentication/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/hotels/:path*", "/rooms/:path*", "/reservations/:path*", "/admin/:path*"],
};
