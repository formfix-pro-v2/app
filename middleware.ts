import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const premiumRoutes = [
  "/dashboard",
  "/session",
  "/account",
];

export function middleware(
  request: NextRequest
) {
  const { pathname } =
    request.nextUrl;

  const protectedRoute =
    premiumRoutes.some(
      (route) =>
        pathname.startsWith(
          route
        )
    );

  if (!protectedRoute) {
    return NextResponse.next();
  }

  // ✅ POPRAVLJENO: Middleware cita informacije iz Cookija, ne iz localStorage-a
  const premium =
    request.cookies.get(
      "premium"
    )?.value;

  if (
    premium !== "true"
  ) {
    const url =
      request.nextUrl.clone();

    url.pathname =
      "/pricing";

    url.searchParams.set(
      "locked",
      "true"
    );

    return NextResponse.redirect(
      url
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/session/:path*",
    "/account/:path*",
  ],
};
