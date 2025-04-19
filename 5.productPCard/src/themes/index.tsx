import { createTheme } from "@mui/material/styles";
import palette from "./palette.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: palette.green[500],
      dark: palette.green[700],
    },
    neutral: {
      black: palette.neutral.black,
      grey: palette.neutral.grey,
      cream: palette.neutral.cream,
      white: palette.neutral.white,
    },
  },
});

export default theme;