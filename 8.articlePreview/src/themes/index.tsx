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
        ...palette
    },
    typography: {
        body1: { fontSize: "14px", fontFamily: 'Manrope', fontWeight: 400, lineHeight: 1.6 },
        body2: { fontSize: "14px", fontFamily: 'Manrope', fontWeight: 400, lineHeight: 1.6 },
        ...typography
    }
});

export default theme;