import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PwaRegistration from "@/lib/register-pwa";
import StyledComponentsRegistry from "@/lib/registery";
import TabBar from "@/layouts/tab-bar";
import GlobalStyle from "./global-style";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Climb Bro",
    description: "Une application pour trouver ton partenaire de grimpe idéal",
    keywords: [
        "grimpe",
        "escalade",
        "partenaire de grimpe",
        "trouver partenaire de grimpe",
        "application de grimpe",
        "climb up",
        "cergy",
        "cergy saint christophe",
        "aren'ice",
        "cergypontoise",
        "climb bro",
        "grimpeur",
        "grimpeuse",
        "escalade indoor",
        "escalade outdoor",
        "grimpe en salle",
        "grimpe en extérieur",
        "assureur de grimpe",
        "grimpe en tête",
        "grimpe en moulinette",
        "grimpe en bloc",
        "grimpe en solo",
        "grimpe en groupe",
        "grimpe en couple",
        "grimpe en famille",
        "grimpe pour débutant",
        "grimpe pour expert",
        "grimpe pour tous les niveaux",
    ],
};

export const viewport: Viewport = {
    themeColor: "#0f172a",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <PwaRegistration />
                    {children}
                    <TabBar />
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
