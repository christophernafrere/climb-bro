"use client";
import React from "react";
import styled from "styled-components";
import colors from "@/lib/colors";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, BellIcon } from "lucide-react";

export default function Header() {
    const pathName = usePathname();
    const mainUrl = ["/", "/calendar", "/partner", "/profil"];
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

            <NotificationButton>
                <BellIcon />
            </NotificationButton>
        </Container>
    );
}

const Container = styled.header`
    position: sticky;
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
