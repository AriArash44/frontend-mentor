import ArticleLayout from "../layout/ArticleLayout";
import DrawerImage from "../../assets/images/drawers.jpg";
import AvatarImage from "../../assets/images/avatar-michelle.jpg";
import shareIcon from "../../assets/images/icon-share.svg";
import { Grid, Typography, Button, useTheme } from "@mui/material";

const ArticlePreview = () => {
    const theme = useTheme();
    return (
      <ArticleLayout>
        <ArticleLayout.Figure>
          <img src={DrawerImage} alt="Drawer" className="w-full h-full"/>
        </ArticleLayout.Figure>
        <ArticleLayout.Header>
          <Typography component="h1" variant="h5" gutterBottom sx={{
            color: theme["palette"]["grayishBlue"]["very_dark"]
          }}>
            Shift the overall look and feel by adding these wonderful touches to furniture in your home 
          </Typography>
        </ArticleLayout.Header>
        <ArticleLayout.Main>
          <Typography component="p" sx={{
            color: theme["palette"]["grayishBlue"]["very_dark"]
          }}>
            Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete. 
          </Typography>
        </ArticleLayout.Main>
        <ArticleLayout.Footer>
          <Grid container sx={{ marginTop: 3, flexWrap: "nowrap", alignItems: "center"}}>
            <Grid size={2}>
              <img src={AvatarImage} alt="Avatar" className="rounded-full w-15"/>
            </Grid>
            <Grid size={8} sx={{ marginLeft: 2 }}>
              <Typography component="p" gutterBottom sx={{
                color: theme["palette"]["grayishBlue"]["very_dark"], fontWeight: 700
              }}>Michelle Appleton</Typography>
              <Typography component="p" sx={{color: theme["palette"]["grayishBlue"]["dark"]}}>28 Jun 2020</Typography>
            </Grid>
            <Grid size={2}>
              <Button sx={{ 
                bgcolor: theme["palette"]["grayishBlue"]["light"],
                borderRadius: "9999px",
                minWidth: "50px",
                height: "50px"
               }}>
                <img src={shareIcon} alt="click" className=""/>
              </Button>
            </Grid>
          </Grid>
        </ArticleLayout.Footer>
      </ArticleLayout>
    );
}

export default ArticlePreview;