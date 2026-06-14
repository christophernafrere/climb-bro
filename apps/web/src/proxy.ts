import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

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
        "/auth/sign-in",
        "/auth/sign-up",
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
