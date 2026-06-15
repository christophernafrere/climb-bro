const CACHE_NAME = "climb-bro-pwa-v2";
const PRECACHE_URLS = ["/", "/icon.svg", "/manifest.webmanifest"];
const CACHEABLE_DESTINATIONS = new Set(["image", "font"]);

function isNextInternalRequest(url) {
    return (
        url.pathname.startsWith("/_next/") ||
        url.pathname.startsWith("/__nextjs") ||
        url.searchParams.has("_rsc")
    );
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME)
                        .map((cacheName) => caches.delete(cacheName)),
                ),
            ),
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    if (
        event.request.method !== "GET" ||
        url.origin !== self.location.origin ||
        isNextInternalRequest(url)
    ) {
        return;
    }

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(async () => {
                const cachedShell = await caches.match("/");
                return cachedShell ?? Response.error();
            }),
        );
        return;
    }

    if (!CACHEABLE_DESTINATIONS.has(event.request.destination)) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    if (!networkResponse.ok || networkResponse.type !== "basic") {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return networkResponse;
                })
                .catch(async () => {
                    if (event.request.destination === "document") {
                        const cachedShell = await caches.match("/");
                        return cachedShell ?? Response.error();
                    }

                    return Response.error();
                });
        }),
    );
});
