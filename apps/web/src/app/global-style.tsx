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
        padding: 20px;
        margin-bottom: 80px;
    }

        

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }
    p {
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;
