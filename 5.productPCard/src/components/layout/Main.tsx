import { Box, Grid } from "@mui/material";
import theme from "../../themes";
import { useTheme } from "@emotion/react";
import React from "react";

interface MainProps {
    className?: string;
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({
    className = "default",
    children,
}) => {
    useTheme();
    return(
      <Grid sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.neutral.cream,
      }}>
        <Box sx={{
          borderRadius: 2,
          overflow: 'clip',
          backgroundColor: theme.palette.neutral.white,
          width: 'min(clamp(500px, 47vw, 1000px), 95%)'
        }} component="main" className={className}>
          {children}
        </Box>
      </Grid>
    );
};

export default Main;