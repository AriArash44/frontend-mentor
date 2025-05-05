import ArticleLayout from "../layout/ArticleLayout";
import DrawerImage from "../../assets/images/drawers.jpg";
import AvatarImage from "../../assets/images/avatar-michelle.jpg";
import shareIcon from "../../assets/images/icon-share.svg";
import shareIconActive from "../../assets/images/icon-share-white.svg";
import { Grid, Box, Typography, Button, useTheme, styled } from "@mui/material";
import OverrideTooltip from "../overrides/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/slices/uiStateSlice.ts";
import { useState, useEffect, useCallback, useRef } from "react";




const iconButtonStyles = {
    minWidth: "20px",
    height: "20px",
};

const StyledButton = styled(Button)(iconButtonStyles);

const ArticlePreview = () => {
    const isActive = useSelector((state: RootState) => state.uiState.active);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);
    const componentRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const ShareButton = () => {
        return (
          <Button ref={componentRef} sx={{ 
            bgcolor: isActive ? theme["palette"]["grayishBlue"]["dark"] : theme["palette"]["grayishBlue"]["light"],
            borderRadius: "9999px", minWidth: "40px", height: "40px"
          }}
          onMouseEnter={() => dispatch({ type: "MAKE_ACTIVE" })}
          onMouseLeave={() => dispatch({ type: "MAKE_INACTIVE" })}
          onClick={() => dispatch({ type: "MAKE_ACTIVE" })}
          onOutsideClick={() => dispatch({ type: "MAKE_INACTIVE" })}>
            <img src={isActive ? shareIconActive : shareIcon} alt="click" className=""/>
          </Button>
        );
    };
    const ShareButton = ShareButton();
    const TooltipContent = (isMobile: boolean) => {
        return (
          <Grid container spacing={0.5} sx={{
            bgcolor: theme["palette"]["grayishBlue"]["very_dark"],
            padding: 2, width: "100%", hight: "100%", alignItems: "center"
          }}>
            <Grid size={windowWidth < 900 ? 4 : 6}>
              <Typography sx={{fontStyle: "mono", color: theme["palette"]["grayishBlue"]["light"]}}>S H A R E</Typography>
            </Grid><Grid size={2}>
              <StyledButton onClick={facebookShareUrl(window.location.href)}>
                <img src={FacebookIcon} alt=""/>
              </StyledButton>
            </Grid><Grid size={2}>
              <StyledButton onClick={twitterShareUrl(window.location.href)}>
                <img src={TwitterIcon} alt=""/>
              </StyledButton>
            </Grid><Grid size={2}>
              <StyledButton onClick={pinterestShareUrl(window.location.href)}>
                <img src={PinterestIcon} alt=""/>
              </StyledButton>
            </Grid><Grid size={windowWidth < 900 ? 2 : 0}>
              { isMobile && 
                ``
              }
            </Grid>
          </Grid>
        );
    };
    return (
      <ArticleLayout>
        <ArticleLayout.Figure>
          <img src={DrawerImage} alt="Drawer" className="w-full h-full"/>
        </ArticleLayout.Figure>
        <ArticleLayout.Header>
          <Box component="div" sx={{paddingX: 3, paddingTop: 3, paddingBottom: 1}}>
            <Typography component="h1" gutterBottom sx={{
              color: theme["palette"]["grayishBlue"]["very_dark"],
              fontSize : {xs: "20px", md: "26px"},
              fontWeight: 700
            }}>
              Shift the overall look and feel by adding these wonderful touches to furniture in your home 
            </Typography>
          </Box>
        </ArticleLayout.Header>
        <ArticleLayout.Main>
          <Box component="div" sx={{paddingX: 3}}>
            <Typography component="p" sx={{
              color: theme["palette"]["grayishBlue"]["very_dark"]
            }}>
              Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete. 
            </Typography>
          </Box>
        </ArticleLayout.Main>
        <ArticleLayout.Footer>
          { isActive && windowWidth < 900 ? 
            <Box sx={{paddingTop: 1}}>
              { TooltipContent(true) }
            </Box>
          : <Grid container sx={{ marginTop: 3, flexWrap: "nowrap", alignItems: "center", paddingX: 3, paddingBottom: 3}}>
              <Grid size={{xs: 2, md: 1}}>
                <img src={AvatarImage} alt="Avatar" className="rounded-full w-12"/>
              </Grid>
              <Grid size={{xs: 8, md: 9}} sx={{marginLeft: "1rem"}}>
                <Typography component="p" gutterBottom sx={{
                  color: theme["palette"]["grayishBlue"]["very_dark"], fontWeight: 700
                }}>Michelle Appleton</Typography>
                <Typography component="p" sx={{color: theme["palette"]["grayishBlue"]["dark"]}}>28 Jun 2020</Typography>
              </Grid>
              <Grid size={2}>
                { windowWidth >= 900 ? 
                  <OverrideTooltip title={ TooltipContent(false) }>
                    { ShareButton() }
                  </OverrideTooltip>
                : ShareButton()
                }
              </Grid>
            </Grid>
          }
        </ArticleLayout.Footer>
      </ArticleLayout>
    );
}

export default ArticlePreview;