"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: var(--font-geist-sans), sans-serif;
        background-color: #f5f5f5;
        color: #333;
    }
`;

export default GlobalStyle;
