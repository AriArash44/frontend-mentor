import { useRef, useState, useEffect } from "react";
import Override_Button from "../override/Button";
import Override_Modal from "../override/Modal";
import Main from "../layout/Main";
import ResponsiveImage from "../common/ResponsiveImage";
import { Grid, Typography, useTheme, Skeleton } from "@mui/material";
import mobileProductImage from "../../assets/images/image-product-mobile.jpg";
import desktopProductImage from "../../assets/images/image-product-desktop.jpg";
import CartIcon from "../../assets/images/icon-cart.svg";

function useProductPreviewLogic() {
    const [loaded, setLoaded] = useState(false);
    const [calculatedHeight, setCalculatedHeight] = useState("1000px");
    useEffect(() => {
        const calculateHeight = () => {
            const screenWidth = window.innerWidth;
            const newHeight = 250 - 0.5 * (350 - screenWidth);
            return `${newHeight}px`;
        };
        const handleResize = () => {
            setCalculatedHeight(calculateHeight());
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        const mobileImg = new Image();
        const desktopImg = new Image();
        mobileImg.src = mobileProductImage;
        desktopImg.src = desktopProductImage;
        const onImagesLoaded = () => {
            const timer = setTimeout(() => {
                setLoaded(true);
            }, 2000);
            return () => clearTimeout(timer);
        };
        mobileImg.onload = () => {
            desktopImg.onload = onImagesLoaded;
        };
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return { loaded, calculatedHeight };
}

function ProductPreviewSkeleton({ calculatedHeight }: { calculatedHeight: string }) {
    return (
      <Grid container>
        <Grid size={{ xs: 12, sm: 6 }} sx={{
          '@media (max-width: 599.5px)': {
            height: calculatedHeight,
          },
        }}>
          <Skeleton variant="rectangular" height={"100%"}/>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} sx={{
          padding: '2rem',
        }}>
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
        </Grid>
      </Grid>
    );
}

function ProductPreviewLoaded({ calculatedHeight }: { calculatedHeight: string }) {
    const theme = useTheme();
    const modalRef = useRef<{ handleOpen: () => void }>(null);
    return (
      <Main>
        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }} sx={{
            '@media (max-width: 599.5px)': {
              height: calculatedHeight,
            },
          }}>
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
            <Typography variant="h4" component="h1" gutterBottom color={theme.palette.neutral.black} sx={{
              fontSize: "2.4rem",
              '@media (max-width: 599.5px)': {
                fontSize: "2rem",
              },
            }}>
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
                <del style={{
                  color: theme.palette.neutral.grey, 
                  display: "inline-block", 
                  marginTop: "0.3rem", 
                  marginLeft: "0.5rem"
                }}>$169.99</del>
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

function ProductPreview() {
    const { loaded, calculatedHeight } = useProductPreviewLogic();
    return (
      <Main>
        {loaded ? (
          <ProductPreviewLoaded calculatedHeight={calculatedHeight} />
        ) : (
          <ProductPreviewSkeleton calculatedHeight={calculatedHeight} />
        )}
      </Main>
    );
}

export default ProductPreview;