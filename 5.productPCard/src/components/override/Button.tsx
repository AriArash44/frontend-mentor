import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: "contained" | "outlined" | "text";
    disabled?: boolean;
}

const StyledButton = styled(Button)(() => {
    const theme = useTheme();
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "0.65rem 1rem",
        borderRadius: "0.4rem",
        textTransform: "inherit",
        gap: theme.spacing(1),
        "&:hover, &:active": {
            backgroundColor: theme.palette.primary.dark,
        },
    };
});

const Override_Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = "contained",
    disabled = false,
}) => {
    return (
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <StyledButton
            color="primary"
            variant={variant}
            disabled={disabled}
            onClick={onClick}
          >
            {children}
          </StyledButton>
        </motion.div>
    );
};

export default Override_Button;