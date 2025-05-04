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
        body1: { fontSize: "13px", fontFamily: 'Manrope', fontWeight: 400 },
        body2: { fontSize: "13px", fontFamily: 'Manrope', fontWeight: 400 },
        ...typography
    }
});

export default theme;