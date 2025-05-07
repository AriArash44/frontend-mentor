import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes";
import ArticlePreview from "./component/pages/ArticlePreview";
import { Provider } from 'react-redux';
import store from "./stores/store";

const App = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
          <ArticlePreview/>
        </Provider>
      </ThemeProvider>
    );
}

export default App;