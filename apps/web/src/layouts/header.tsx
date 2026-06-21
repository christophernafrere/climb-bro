"use client";
import styled from "styled-components";
import colors from "@/lib/colors";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon, BellIcon, LogOutIcon } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    const pathName = usePathname();
    const mainUrl = ["/", "/calendar", "/partner", "/profile"];
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (pathName.startsWith("/auth/")) {
            setIsLoggedIn(false);
            return;
        }

        let isMounted = true;

        const checkAuth = async () => {
            try {
                const response = await apiFetch("/auth/me", {
                    method: "GET",
                    skipAuthRefresh: true,
                    redirectOnUnauthorized: false,
                });
                if (isMounted && response.ok) {
                    setIsLoggedIn(true);
                } else if (isMounted) {
                    setIsLoggedIn(false);
                }
            } catch {
                if (isMounted) {
                    setIsLoggedIn(false);
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [pathName]);

    return (
        <Container>
            <LeftSide>
                {!mainUrl.includes(pathName) && (
                    <BackButton onClick={() => window.history.back()}>
                        <ArrowLeftIcon />
                    </BackButton>
                )}
                <h1>Climb Bro</h1>
            </LeftSide>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <NotificationButton>
                    <BellIcon />
                </NotificationButton>

                {isLoggedIn && (
                    <NotificationButton
                        onClick={async () => {
                            await apiFetch(
                                "/auth/logout",
                                {
                                    method: "POST",
                                },
                                router,
                            );
                            setIsLoggedIn(false);
                        }}
                    >
                        <LogOutIcon />
                    </NotificationButton>
                )}
            </div>
        </Container>
    );
}

const Container = styled.header`
    position: sticky;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.surface.light};
    padding: 16px;
`;

const LeftSide = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${colors.main.primary};
    display: flex;
    align-items: center;

    h1 {
        font-size: 20px;
    }
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background-color: transparent;
`;

const NotificationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    background-color: transparent;
`;
