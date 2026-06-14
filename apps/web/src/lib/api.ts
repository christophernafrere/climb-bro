const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type ApiFetchOptions = RequestInit & {
    skipAuthRefresh?: boolean;
    redirectOnUnauthorized?: boolean;
};

const AUTH_ENDPOINTS_WITHOUT_REFRESH = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/refresh",
    "/auth/logout",
];

function shouldSkipRefresh(endpoint: string, skipAuthRefresh?: boolean) {
    return (
        skipAuthRefresh ||
        AUTH_ENDPOINTS_WITHOUT_REFRESH.some((authEndpoint) =>
            endpoint.startsWith(authEndpoint),
        )
    );
}

export async function apiFetch(
    endpoint: string,
    options: ApiFetchOptions = {},
) {
    const {
        skipAuthRefresh,
        redirectOnUnauthorized = true,
        headers,
        ...requestOptions
    } = options;
    const requestHeaders = new Headers(headers);

    if (
        !requestHeaders.has("Content-Type") &&
        !(
            typeof FormData !== "undefined" &&
            requestOptions.body instanceof FormData
        )
    ) {
        requestHeaders.set("Content-Type", "application/json");
    }

    let response = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        ...requestOptions,
        headers: requestHeaders,
    });

    if (response.status === 401 && !shouldSkipRefresh(endpoint, skipAuthRefresh)) {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!refreshResponse.ok) {
            if (redirectOnUnauthorized && typeof window !== "undefined") {
                window.location.href = "/auth/sign-in";
            }
            throw new Error("Unauthorized");
        }

        response = await fetch(`${API_URL}${endpoint}`, {
            credentials: "include",
            ...requestOptions,
            headers: requestHeaders,
        });
    }

    return response;
}
