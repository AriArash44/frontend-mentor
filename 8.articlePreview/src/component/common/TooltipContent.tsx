import { Grid, Typography, Button, useTheme, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import FacebookIcon from "../../assets/images/icon-facebook.svg";
import TwitterIcon from "../../assets/images/icon-twitter.svg";
import PinterestIcon from "../../assets/images/icon-pinterest.svg";
import ShareButton from "./ShareButton";

//todo: check that share APIs works fine
const facebookShareUrl = (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
const twitterShareUrl = (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
const pinterestShareUrl = (url: string) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`;

const iconButtonStyles = {
    minWidth: "25px",
    height: "25px",
};

const StyledButton = styled(Button)(iconButtonStyles);

const TooltipContent = () => {
    const theme = useTheme();
    const windowWidth = useSelector((state: RootState) => state.windowWidth.width);
    const sharedButtenComponent = useSelector((state: RootState) => state.shareButton.currentComponent)
    return (
      <Grid container spacing={0.5} sx={{
        bgcolor: theme["palette"]["grayishBlue"]["very_dark"],
        padding: 2, width: "100%", hight: "100%", alignItems: "center"
      }}>
        <Grid size={windowWidth < 900 ? 4 : 6}>
          <Typography sx={{fontFamily: "monospace", color: theme["palette"]["grayishBlue"]["light"]}}>S H A R E</Typography>
        </Grid><Grid size={2}>
          <StyledButton onClick={() => facebookShareUrl(window.location.href)}>
            <img src={FacebookIcon} alt=""/>
          </StyledButton>
        </Grid><Grid size={2}>
          <StyledButton onClick={() => twitterShareUrl(window.location.href)}>
            <img src={TwitterIcon} alt=""/>
          </StyledButton>
        </Grid><Grid size={2}>
          <StyledButton onClick={() => pinterestShareUrl(window.location.href)}>
            <img src={PinterestIcon} alt=""/>
          </StyledButton>
        </Grid><Grid size={windowWidth < 900 ? 2 : 0}>
          {sharedButtenComponent === "tooltipContent" && <ShareButton />}
        </Grid>
      </Grid>
    );
};

export default TooltipContent;