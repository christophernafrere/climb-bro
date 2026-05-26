"use client";
import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";

export default function QRScanner() {
    const router = useRouter();

    useEffect(() => {
        const scanner = new Html5Qrcode("reader");

        scanner
            .start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 250,
                },
                (decodedText) => {
                    console.log("QR détecté :", decodedText);
                    router.push(decodedText);
                },
                () => {},
            )
            .catch(console.error);

        return () => {
            scanner.stop().catch(() => {});
        };
    }, []);

    return <div id="reader" />;
}
