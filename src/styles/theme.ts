import { DefaultTheme } from "styled-components";

const baseTheme = {
  fonts: {
    body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'var(--font-geist-mono), "SF Mono", "Roboto Mono", Menlo, Courier, monospace',
  },
  fontSizes: {
    small: "12px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
  },
  spacing: {
    small: "8px",
    medium: "12px",
    large: "16px",
    xlarge: "24px",
  },
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    primary: "#3498db",
    secondary: "#0088CC",
    accent: "#e74c3c",

    textPrimary: "#333",
    textSecondary: "#666",
    textAccent: "#3498db",
    textInverse: "#fff",

    background: "#1c1c1c",
    backgroundAlt: "black",
    backgroundCard: "#2c2c2e",
    backgroundInverse: "#333333",

    success: "#27ae60",
    error: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
  },
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    primary: "#FFF",
    secondary: "#0088CC",
    accent: "#e74c3c",

    textPrimary: "#333",
    textSecondary: "#666",
    textAccent: "#3498db",
    textInverse: "#fff",

    background: "#1c1c1c",
    backgroundAlt: "black",
    backgroundCard: "#2c2c2e",
    backgroundInverse: "#333333",

    success: "#27ae60",
    error: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
  },
};
