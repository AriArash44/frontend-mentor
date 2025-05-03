import { ThemeProvider } from "@mui/material/styles";
import Home from "./components/pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes";

const App = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Home/>
      </ThemeProvider>
    );
}

export default App;