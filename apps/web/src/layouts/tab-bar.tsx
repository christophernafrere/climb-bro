"use client";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    CalendarIcon,
    User2Icon,
    Users2Icon,
    QrCodeIcon,
} from "lucide-react";
import colors from "@/lib/colors";
export default function TabBar() {
    const pathname = usePathname();
    const showMainTab = pathname !== "/partner/me";
    const tabs = [
        {
            name: "Flux",
            href: "/",
            icon: HomeIcon,
        },
        {
            name: "Calendrier",
            href: "/calendar",
            icon: CalendarIcon,
        },
        {
            name: "",
            href: "/partner/me",
            icon: QrCodeIcon,
            main: true,
        },
        {
            name: "partenaires",
            href: "/partner",
            icon: Users2Icon,
        },
        {
            name: "Profile",
            href: "/profile",
            icon: User2Icon,
        },
    ];
    return (
        <Container>
            {tabs
                .filter((tab) => showMainTab || !tab.main)
                .map((tab) => (
                    <Tab
                        key={tab.name || tab.href}
                        href={tab.href}
                        $main={tab.main}
                        $selected={pathname === tab.href}
                    >
                        <tab.icon size={tab.main ? 46 : 24} />
                        {tab.name}
                    </Tab>
                ))}
        </Container>
    );
}

const Container = styled.section<{ $selected?: boolean }>`
    position: fixed;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: 8px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${colors.surface.light};
    box-shadow: 0 -4px 8px ${colors.main.accent}14;
`;

const Tab = styled(Link)<{ $selected?: boolean; $main?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    color: var(--geist-foreground);
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: transparent;
    border-radius: 0.5rem;

    ${({ $selected }) =>
        $selected &&
        `
        background-color: ${colors.main.primary};
        color: ${colors.surface.light};
    `}

    ${({ $main }) =>
        $main &&
        `
        position: absolute;
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        border: 2px solid ${colors.border.default};
        width: 56px;
        height: 56px;
        border-radius: 9999px;
        background-color: ${colors.main.primary};
        color: ${colors.surface.light};
        margin-top: -24px;
        box-shadow: 0 4px 8px ${colors.main.accent}1a;
    `}
`;
