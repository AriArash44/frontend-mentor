import ArticleLayout from "../layout/ArticleLayout";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import OverrideTooltip from "../overrides/Tooltip";
import ShareButton from "../common/ShareButton";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import TooltipContent from "../common/TooltipContent";
import DrawerImage from "../../assets/images/drawers.jpg";
import AvatarImage from "../../assets/images/avatar-michelle.jpg";

const ArticlePreview = () => {
    const isActive = useSelector((state: RootState) => state.uiState.active);
    const windowWidth = useSelector((state: RootState) => state.windowWidth.width)
    const theme = useTheme();
    return (
      <ArticleLayout>
        <ArticleLayout.Figure>
          <img src={DrawerImage} alt="Drawer" className="w-full h-full"/>
        </ArticleLayout.Figure>
        <ArticleLayout.Header>
          <Box component="div" sx={{paddingX: 4, paddingTop: 4, paddingBottom: 1}}>
            <Typography component="h1" gutterBottom sx={{
              color: theme["palette"]["grayishBlue"]["very_dark"],
              fontSize : {xs: "18px", md: "23px"}, fontWeight: 700
            }}>
              Shift the overall look and feel by adding these wonderful touches to furniture in your home 
            </Typography>
          </Box>
        </ArticleLayout.Header>
        <ArticleLayout.Main>
          <Box component="div" sx={{paddingX: 4}}>
            <Typography component="p" sx={{
              color: theme["palette"]["grayishBlue"]["very_dark"]
            }}>
              Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete. 
            </Typography>
          </Box>
        </ArticleLayout.Main>
        <ArticleLayout.Footer>
          { isActive && windowWidth < 900 ? 
            <Box sx={{paddingTop: 2}}>
              <TooltipContent />
            </Box>
          : <Grid container sx={{ marginTop: 3, flexWrap: "nowrap", alignItems: "center", paddingX: 4, paddingBottom: 4}}>
              <Grid size={2}>
                <img src={AvatarImage} alt="Avatar" className="rounded-full w-14"/>
              </Grid>
              <Grid size={8} sx={{marginLeft: "1rem"}}>
                <Typography component="p" sx={{
                  color: theme["palette"]["grayishBlue"]["very_dark"], fontWeight: 700, paddingBottom: windowWidth >= 900 ? "3px" : "" 
                }}>Michelle Appleton</Typography>
                <Typography component="p" sx={{color: theme["palette"]["grayishBlue"]["dark"]}}>28 Jun 2020</Typography>
              </Grid>
              <Grid size={2}>
                { windowWidth >= 900 ? 
                  <OverrideTooltip title={<TooltipContent/>}>
                    <Grid container justifyContent="center" >
                      <ShareButton isVisible={true} />
                    </Grid>
                  </OverrideTooltip>
                : <ShareButton isVisible={true} />
                }
              </Grid>
            </Grid>
          }
        </ArticleLayout.Footer>
      </ArticleLayout>
    );
}

export default ArticlePreview;