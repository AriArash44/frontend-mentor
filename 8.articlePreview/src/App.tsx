import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes";
import ArticlePreview from "./component/pages/ArticlePreview";
import { Provider } from 'react-redux';
import store from "./stores/store";
import ShareButton from "./component/common/ShareButton";

const App = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
          <ArticlePreview/>
          <ShareButton />
        </Provider>
      </ThemeProvider>
    );
}

export default App;