import { Box } from "@mui/material";
import theme from "../../themes";
import { useTheme } from "@emotion/react";
import React from "react";

interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({
    children
}) => {
    useTheme();
    return(
      <Box sx={{
        borderRadius: 1,
        backgroundColor: theme.palette.neutral.white,
        width: 'min(clamp(500px, 47vw, 1000px), 95%)'
      }} component="main">
        {children}
      </Box>
    );
};

export default Main;