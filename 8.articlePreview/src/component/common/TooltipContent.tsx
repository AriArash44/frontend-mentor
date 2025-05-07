import { Grid, Typography, Button, useTheme, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/store";
import FacebookIcon from "../../assets/images/icon-facebook.svg";
import TwitterIcon from "../../assets/images/icon-twitter.svg";
import PinterestIcon from "../../assets/images/icon-pinterest.svg";
import { makeActive, makeInactive } from "../../stores/slices/uiStateSlice";
import ShareButton from "./ShareButton";

const facebookShareUrl = (url: string) => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
const twitterShareUrl = (url: string) => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
const pinterestShareUrl = (url: string) => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`);

const iconButtonStyles = {
    minWidth: "25px",
    height: "25px",
};

const StyledButton = styled(Button)(iconButtonStyles);

const TooltipContent = () => {
    const windowWidth = useSelector((state: RootState) => state.windowWidth.width);
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
      <Grid container spacing={0.5} sx={{
        bgcolor: theme["palette"]["grayishBlue"]["very_dark"],
        padding: 2, width: "100%", height: "100%", alignItems: "center"
      }} onMouseLeave={() => {
        dispatch(makeInactive())
      }} onMouseEnter={() => {
        dispatch(makeActive());
      }}>
        <Grid size={{xs: 4, md: 6}}>
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
        </Grid>
        <Grid size={{xs: 2, md: 0}}>
          <ShareButton isVisible={windowWidth < 900}/>
        </Grid>
      </Grid>
    );
};

export default TooltipContent;