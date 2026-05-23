"use client";
import colors from "@/lib/colors";
import styled from "styled-components";

export const Button = styled.button`
    padding: 8px 16px;
    background-color: ${colors.main.secondary};
    color: ${colors.surface.light};
    font-weight: bold;
    border: none;
    border-radius: 9999px;
`;
