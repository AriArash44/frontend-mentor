import { Box, Grid } from "@mui/material";
import theme from "../../themes";
import React from "react";

interface MainProps {
    className?: string;
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({
    className = "default",
    children,
}) => {
    return(
      <Grid sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.neutral.cream,
        padding: "1rem 0"
      }}>
        <Box sx={{
          borderRadius: 2,
          overflow: 'clip',
          backgroundColor: theme.palette.neutral.white,
          width: 'min(690px, 95%)',
          '@media (max-width: 599.5px)': {
            width: 'min(clamp(420px, 80vw, 100%), 95%)',
          },
        }} component="main" className={className}>
          {children}
        </Box>
      </Grid>
    );
};

export default Main;