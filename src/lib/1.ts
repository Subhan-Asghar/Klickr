// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("jwt")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

//     const requestHeaders = new Headers(req.headers);
//     requestHeaders.set("x-user-id", decoded.id);
//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
//   } catch(err) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/api/:path*",],
// };
