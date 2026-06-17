export { middleware } from "./src/proxy";

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
        "/auth/sign-in",
        "/auth/sign-up",
    ],
};
