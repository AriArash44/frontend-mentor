import { createTheme } from "@mui/material/styles";
import typography from "./typography.js";
import globalFonts from "./fonts.js";
import palette from "./palette.js";

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
        body1: { fontFamily: '"SpaceGrotesk", serif', fontWeight: 400 },
        body2: { fontSize: "clamp(1.2rem, calc(5vw), 2rem)", fontFamily: '"SpaceGrotesk", serif', fontWeight: 400 },
        ...typography
    }
});

export default theme;