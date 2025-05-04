import React, { ReactElement, ReactNode } from "react";
import { Grid, Box } from "@mui/material";

interface ArticleLayoutProps {
    children: ReactNode;
}

interface CompoundChildProps {
    children: ReactNode;
}

const Figure: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
const Header: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
const Main: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
const Footer: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;

type ArticleLayoutComponent = React.FC<ArticleLayoutProps> & {
    Figure: typeof Figure;
    Header: typeof Header;
    Main: typeof Main;
    Footer: typeof Footer;
};

const ArticleLayout: ArticleLayoutComponent = ({ children }) => {
    let figure: ReactElement | undefined;
    let header: ReactElement | undefined;
    let main: ReactElement | undefined;
    let footer: ReactElement | undefined;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === Figure) figure = child;
            if (child.type === Header) header = child;
            if (child.type === Main) main = child;
            if (child.type === Footer) footer = child;
        }
    });
    return (
      <Grid container component="div">
        <Grid size={{ xs: 12, md: 5 }}>
          <Box component="figure">{figure}</Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="header">{header}</Box>
          <Box component="main">{main}</Box>
          <Box component="footer">{footer}</Box>
        </Grid>
      </Grid>
    );
};

ArticleLayout.Figure = Figure;
ArticleLayout.Header = Header;
ArticleLayout.Main = Main;
ArticleLayout.Footer = Footer;

export default ArticleLayout;