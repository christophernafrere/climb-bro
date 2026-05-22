const palette = {
    slate950: "#0f172a",
    slate950Alt: "#0b1120",
    slate100: "#e2e8f0",
    slate300: "#cbd5e1",
    slate500: "#64748b",
    slate700: "#334155",
    stone100: "#f5f5f5",
    green500: "#22c55e",
    teal400: "#2ec4b6",
    teal500: "#14b8a6",
    teal600: "#0f766e",
    sky500: "#0ea5e9",
    sky400: "#38bdf8",
    amber500: "#f59e0b",
    orange500: "#f97316",
    purple500: "#a855f7",
    violet500: "#8b5cf6",
    white: "#ffffff",
    black: "#000000",
} as const;

const colors = {
    palette,
    surface: {
        base: palette.white,
        elevated: palette.stone100,
        inverse: palette.slate950,
        muted: palette.slate100,
        card: palette.white,
        overlay: "rgba(15, 23, 42, 0.72)",
        teal: palette.teal600,
        red: palette.orange500,
        orange: palette.amber500,
        blue: palette.sky500,
        green: palette.green500,
        purple: palette.violet500,
    },
    text: {
        primary: palette.slate950,
        secondary: palette.slate700,
        tertiary: palette.slate500,
        inverse: palette.white,
        subtle: palette.slate300,
        accent: palette.teal600,
        brand: palette.purple500,
    },
    border: {
        subtle: palette.slate300,
        default: palette.slate100,
        strong: palette.slate700,
        focus: palette.teal400,
    },
    brand: {
        primary: palette.teal600,
        secondary: palette.purple500,
        accent: palette.sky500,
    },
    action: {
        primary: palette.teal600,
        secondary: palette.purple500,
        destructive: palette.orange500,
        info: palette.sky500,
    },
    state: {
        success: palette.green500,
        warning: palette.amber500,
        danger: palette.orange500,
        info: palette.sky400,
    },
    overlay: {
        scrim: "rgba(0, 0, 0, 0.6)",
        subtle: "rgba(15, 23, 42, 0.12)",
    },
} as const;

export { palette };
export default colors;
