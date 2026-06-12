const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiFetch(endpoint: string, options?: RequestInit) {
    let response = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (response.status === 401) {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!refreshResponse.ok) {
            window.location.href = "/auth/sign-in";
            throw new Error("Unauthorized");
        }

        response = await fetch(`${API_URL}${endpoint}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        });
    }

    return response;
}
