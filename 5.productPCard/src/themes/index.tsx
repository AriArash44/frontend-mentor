import { createTheme } from "@mui/material/styles";
import typography from "./typography.ts";
import globalFonts from "./fonts.ts";
import palette from "./palette.ts";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: globalFonts,
        },
    },
    palette: {
        primary: {
            main: palette.green[500],
            dark: palette.green[700],
        },
        neutral: {
            ...palette.neutral
        },
    },
    typography: {
        // fontFamily: '"Montserrat", sans-serif',
        body1: { fontWeight: 500 },
        body2: { fontWeight: 500 },
        ...typography
    }
});

export default theme;