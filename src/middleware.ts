import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === "/";

    // If on the auth page and authenticated, redirect to dashboard
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dash", req.url));
      }
      // Continue to the auth page if not authenticated
      return NextResponse.next();
    }

    // If not authenticated, redirect to the login page
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Continue to the requested page if authenticated
    return NextResponse.next();
  },
  {
    callbacks: {
      // Always authorize the middleware to run, but you can adjust this if needed
      async authorized() {
        return true;
      },
    },
  }
);
