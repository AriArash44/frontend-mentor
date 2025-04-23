import { useRef, useState, useEffect } from "react";
import Override_Button from "../override/Button";
import Override_Modal from "../override/Modal";
import CartIcon from "../../assets/images/icon-cart.svg";
import { Grid, Typography, useTheme, Skeleton } from "@mui/material";
import ResponsiveImage from "../common/ResponsiveImage";
import mobileProductImage from "../../assets/images/image-product-mobile.jpg";
import desktopProductImage from "../../assets/images/image-product-desktop.jpg";
import Main from "../layout/Main";

function ProductPreview() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const mobileImg = new Image();
        const desktopImg = new Image();
        mobileImg.src = mobileProductImage;
        desktopImg.src = desktopProductImage;
        mobileImg.onload = () => {
          desktopImg.onload = () => {
            const timer = setTimeout(() => {
              setLoaded(true);
              }, 200000);
            return () => clearTimeout(timer);
            };
        };
    }, []);
    const theme = useTheme();
    const modalRef = useRef<{ handleOpen: () => void }>(null);
    return (
      <Main>
        <Grid spacing={2} container>
          <Grid size={{ xs: 12, sm: 6 }} sx={{
            '@media (max-width: 599.5px)': {
              height: '250px',
            }
          }}>
            { 
              loaded ? 
              <ResponsiveImage mobileImage={mobileProductImage} desktopImage={desktopProductImage} alt="product image"/> :
              <Skeleton variant="rectangular" height={"100%"}/>
            }
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{
            padding: '2rem',
          }}>
            {
              loaded ?
              <>
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
                  <Grid size={7}>
                    <Typography variant="h4" component="h2" color={theme.palette.primary.main}>
                      $149.99
                    </Typography>
                  </Grid> 
                  <Grid size={5}>
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
              </> : 
              <>
                <Skeleton variant="text" width={"50%"} sx={{fontSize: "1rem", marginBottom: "1rem"}} />
                <Skeleton variant="text" width={"100%"} sx={{fontSize: "2rem"}} />
                <Skeleton variant="text" width={"80%"} sx={{fontSize: "2rem", marginBottom: "1rem"}} />
                <Skeleton variant="text" width={"100%"} sx={{fontSize: "1rem"}} />
                <Skeleton variant="text" width={"100%"} sx={{fontSize: "1rem"}} />
                <Skeleton variant="text" width={"100%"} sx={{fontSize: "1rem"}} />
                <Skeleton variant="text" width={"50%"} sx={{fontSize: "1rem", marginBottom: "1rem"}} />
                <Grid container sx={{marginBottom: "1rem"}}>
                  <Grid size={6}>
                    <Skeleton variant="text" width={"80%"} sx={{fontSize: "1.5rem"}} />
                  </Grid>
                  <Grid size={6}>
                    <Skeleton variant="text" width={"30%"} sx={{fontSize: "1rem"}} />
                  </Grid>
                </Grid>
                <Skeleton variant="rounded" width={"100%"} height={"2rem"} />
              </>
            }
          </Grid>
        </Grid>
      </Main>
    );
}

export default ProductPreview;