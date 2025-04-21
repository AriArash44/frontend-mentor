import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    </ThemeProvider>
  );
}

export default App;
