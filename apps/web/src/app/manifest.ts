import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Climb Bro",
        short_name: "Climb Bro",
        description:
            "Une application pour trouver ton partenaire de grimpe idéal",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#0b1120",
        theme_color: "#0f172a",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "maskable",
            },
        ],
    };
}
