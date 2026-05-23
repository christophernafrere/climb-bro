"use client";
import colors from "@/lib/colors";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: var(--font-geist-sans), sans-serif;
        background-color: ${colors.surface.cream}
    }
    main {
        padding: 20px
    }
`;

export default GlobalStyle;
