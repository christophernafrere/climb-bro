export { proxy } from "./src/proxy";

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
