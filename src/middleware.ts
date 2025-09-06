import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret=new TextEncoder().encode(process.env.JWT_SECRET)
    const {payload} = await jwtVerify(token,secret)
    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("user-id", payload.id as string );
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch(err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*",
    "/api/link/:path*",
    "/links/:path*",
    "/api/click/:path*"
  ],
};
