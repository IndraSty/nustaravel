import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authPage = ["/auth/login", "/auth/daftar", "/auth/phone"];
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && !authPage.includes(pathname)) {
    const url = new URL("/");
    return NextResponse.redirect(url);
  }

  if (token) {
  
    if (token.phone == '' ) {
      return NextResponse.redirect(new URL("/auth/phone", req.url));
    }
    if (token.phone !== '' && authPage.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/auth/login", "/auth/daftar"]
}

// export default withAuth(mainMiddleware, ["/auth/login", "/auth/daftar"]);

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import withAuth from "./middlewares/withAuth";

// export function mainMiddleware(req: NextRequest) {
//   const res = NextResponse.next();
//   return res;
// }

// export default withAuth(mainMiddleware, ["/auth/login", "/auth/daftar"]);
