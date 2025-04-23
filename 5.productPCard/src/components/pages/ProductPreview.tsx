import { useRef } from "react";
import Override_Button from "../override/Button";
import Override_Modal from "../override/Modal";
import CartIcon from "../../assets/images/icon-cart.svg";
import { Grid, useTheme } from "@mui/material";
import ResponsiveImage from "../common/ResponsiveImage";
import mobileProductImage from "../../assets/images/image-product-mobile.jpg";
import desktopProductImage from "../../assets/images/image-product-desktop.jpg";
import Main from "../layout/Main";

function ProductPreview() {
    useTheme();
    const modalRef = useRef<{ handleOpen: () => void }>(null);
    return (
      <Main>
        <Grid spacing={2} container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ResponsiveImage mobileImage={mobileProductImage} desktopImage={desktopProductImage} alt="product image"/>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
          <Override_Button onClick={() => {
              modalRef.current?.handleOpen();
          }}>
              <img src={CartIcon} alt="" />
              Add to Cart
          </Override_Button>
          <Override_Modal ref={modalRef} title="You clicked!" message="you clicked the add to cart button successfully!!"/>
          </Grid>
        </Grid>
      </Main>
    );
}

export default ProductPreview;