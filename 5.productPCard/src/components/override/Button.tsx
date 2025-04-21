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

const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
}));

const Override_Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = "contained",
    disabled = false,
}) => {
    const theme = useTheme();
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                color: theme.palette.primary.dark,
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.95,
                color: theme.palette.primary.dark,
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