import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("user-id", payload.id as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/link/:path*",
    "/links/:path*",
    "/api/click/:path*",
    "/api/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
