import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

    console.log(request.cookies.getAll());

    const pathname = request.nextUrl.pathname;
    const isAuthPage =
        pathname === "/auth/sign-in" || pathname === "/auth/sign-up";

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile",
        "/profile/:path*",
        "/search",
        "/search/:path*",
        "/chat",
        "/chat/:path*",
        "/partner",
        "/partner/:path*",
    ],
};
