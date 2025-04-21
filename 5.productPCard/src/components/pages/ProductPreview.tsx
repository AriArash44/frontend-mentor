import { useRef } from "react";
import Override_Button from "../override/Button";
import Override_Modal from "../override/Modal";
import CartIcon from "../../assets/images/icon-cart.svg";
import { Grid, useTheme } from "@mui/material";
import theme from "../../themes";

function ProductPreview() {
    useTheme();
    const modalRef = useRef<{ handleOpen: () => void }>(null);
    return (
      <Grid sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.neutral.cream
      }}>
        <Override_Button onClick={() => {
            modalRef.current?.handleOpen();
        }}>
            <img src={CartIcon} alt="" />
            Add to Cart
        </Override_Button>
        <Override_Modal ref={modalRef} title="You clicked!" message="you clicked the add to cart button successfully!!"/>
      </Grid>
    );
}

export default ProductPreview;