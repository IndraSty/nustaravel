import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = ["/auth/login", "/auth/daftar", "/auth/phone"];

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = []
  ) {
    return async (req: NextRequest, next: NextFetchEvent) => {
      const pathname = req.nextUrl.pathname;
      if (requireAuth.includes(pathname)) {
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });
  
        if (!token && !authPage.includes(pathname)) {
          const url = new URL("/");
          return NextResponse.redirect(url);
        }
  
        if (token) {
            console.log(token.phone)
          if (token.phone !== '' && !authPage.includes(pathname)) {
            console.log(token.phone)
            return NextResponse.redirect(new URL(token.redirectUrl, req.url));
          }
          if (authPage.includes(pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
          }
        }
      }
      return middleware(req, next);
    };
  }
