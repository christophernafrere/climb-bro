"use client";
import colors from "@/lib/colors";
import styled from "styled-components";

export const Button = styled.button<{ color?: "primary" | "secondary" }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    font-size: 0.8rem;
    justify-content: center;
    background-color: ${(props) =>
        props.color === "primary"
            ? colors.main.primary
            : colors.main.secondary};
    color: ${colors.surface.light};
    font-weight: bold;
    border: none;
    border-radius: 9999px;
`;
