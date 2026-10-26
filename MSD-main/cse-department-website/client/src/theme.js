// MUI theme - navy blue + white college colour palette
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d2b52", // navy blue
      light: "#1e4d8c",
      dark: "#071b36",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e8a020", // subtle gold accent
      contrastText: "#0d2b52",
    },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#1b2733",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500 },
      },
    },
  },
});

export default theme;
