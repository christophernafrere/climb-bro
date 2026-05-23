"use client";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, User2Icon, Users2Icon } from "lucide-react";
import colors from "@/lib/colors";
export default function TabBar() {
    const pathname = usePathname();
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
            name: "partenaires",
            href: "/partner",
            icon: Users2Icon,
        },
        {
            name: "Profil",
            href: "/profil",
            icon: User2Icon,
        },
    ];
    return (
        <Container>
            {tabs.map((tab) => (
                <Tab
                    key={tab.name}
                    href={tab.href}
                    $selected={pathname === tab.href}>
                    <tab.icon size={24} />
                    {tab.name}
                </Tab>
            ))}
        </Container>
    );
}

const Container = styled.section<{ $selected?: boolean }>`
    position: fixed;

    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${colors.surface.light};
    box-shadow: 0 -4px 8px ${colors.main.accent}14;
`;

const Tab = styled(Link)<{ $selected?: boolean }>`
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
        background-color: ${colors.main.purple};
        color: ${colors.main.purpleDark};
    `}
`;
