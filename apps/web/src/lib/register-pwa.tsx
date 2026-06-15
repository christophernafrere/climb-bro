"use client";

import { useEffect } from "react";

export default function PwaRegistration() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) {
            return;
        }

        if (process.env.NODE_ENV !== "production") {
            void navigator.serviceWorker
                .getRegistrations()
                .then((registrations) =>
                    Promise.all(
                        registrations.map((registration) =>
                            registration.unregister(),
                        ),
                    ),
                );

            if ("caches" in window) {
                void caches
                    .keys()
                    .then((cacheNames) =>
                        Promise.all(
                            cacheNames
                                .filter((cacheName) =>
                                    cacheName.startsWith("climb-bro-pwa-"),
                                )
                                .map((cacheName) => caches.delete(cacheName)),
                        ),
                    );
            }

            return;
        }

        void navigator.serviceWorker.register("/sw.js");
    }, []);

    return null;
}
