import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5b9dff" }, // your blue accent, brightened for dark
    background: {
      default: "#16171d", // your near-black page bg
      paper: "#1f2028", // one step lighter = "elevated" surfaces
    },
    text: { primary: "#f3f4f6", secondary: "#9ca3af" },
    divider: "#2e303a",
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif" },
});
