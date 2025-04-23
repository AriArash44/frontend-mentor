import { useRef } from "react";
import Override_Button from "../override/Button";
import Override_Modal from "../override/Modal";
import CartIcon from "../../assets/images/icon-cart.svg";
import { Grid, Typography, useTheme } from "@mui/material";
import ResponsiveImage from "../common/ResponsiveImage";
import mobileProductImage from "../../assets/images/image-product-mobile.jpg";
import desktopProductImage from "../../assets/images/image-product-desktop.jpg";
import Main from "../layout/Main";

function ProductPreview() {
    const theme = useTheme();
    const modalRef = useRef<{ handleOpen: () => void }>(null);
    return (
      <Main>
        <Grid spacing={2} container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ResponsiveImage mobileImage={mobileProductImage} desktopImage={desktopProductImage} alt="product image"/>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{
            padding: '2rem',
          }}>
            <Typography color={theme.palette.neutral.grey} sx={{
              fontStyle: "mono",
              marginBottom: "0.5rem",
            }}>
              P E R F U M E
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              Gabrielle Essence Eau De Parfum
            </Typography>
            <Typography color={theme.palette.neutral.grey} gutterBottom>
              A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL.
            </Typography>
            <Grid container sx={{
              margin: "2rem 0rem",
            }}>
              <Grid size={6}>
                <Typography variant="h4" component="h2" color={theme.palette.primary.main}>
                  $149.99
                </Typography>
              </Grid> 
              <Grid size={6}>
                <del color={theme.palette.neutral.grey}>$169.99</del>
              </Grid> 
            </Grid>
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