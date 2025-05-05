import React, { ReactElement, ReactNode } from "react";
import { Grid, Box, useTheme } from "@mui/material";

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
    const theme = useTheme();
    return (
      <Grid container component="div" sx={{
        bgcolor: theme["palette"]["grayishBlue"]["light"],
        height: "100vh", justifyContent: "center", alignItems: "center"
      }}>
        <Grid container className="custom-shadow" component="div" sx={{
          width: {xs: "20rem", md: "clamp(50rem, 60%, 70rem)"}, 
          bgcolor: "white", borderRadius: 2, overflow: "hidden"
        }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box component="figure" sx={{
              width: "100%", height: "100%"
            }}>{figure}</Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }} sx={{padding: 3}}>
            <Box component="header">{header}</Box>
            <Box component="main">{main}</Box>
            <Box component="footer">{footer}</Box>
          </Grid>
        </Grid>
      </Grid>
    );
};

ArticleLayout.Figure = Figure;
ArticleLayout.Header = Header;
ArticleLayout.Main = Main;
ArticleLayout.Footer = Footer;

export default ArticleLayout;