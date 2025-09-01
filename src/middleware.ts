import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // try {
  //   console.log("2 ")
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  //   console.log(decoded)
  //   const requestHeaders = new Headers(req.headers);
  //   requestHeaders.set("x-user-id", decoded as string);
    
  //   return NextResponse.next({
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   });
  // } catch(err) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
}

export const config = {
  matcher: ["/dashboard/:path*",],
};
