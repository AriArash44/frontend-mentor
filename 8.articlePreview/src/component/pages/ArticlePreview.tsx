import ArticleLayout from "../layout/ArticleLayout";
import DrawerImage from "../../assets/images/drawers.jpg";
import AvatarImage from "../../assets/images/avatar-michelle.jpg";
import shareIcon from "../../assets/images/icon-share.svg";
import { Grid, Typography, Button } from "@mui/material";

const ArticlePreview = () => {
    return (
      <ArticleLayout>
        <ArticleLayout.Figure>
          <img src={DrawerImage} alt="Drawer" />
        </ArticleLayout.Figure>
        <ArticleLayout.Header>
          <Typography component="h1" variant="h4">
            Shift the overall look and feel by adding these wonderful touches to furniture in your home 
          </Typography>
        </ArticleLayout.Header>
        <ArticleLayout.Main>
          <Typography component="p">
            Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete. 
          </Typography>
        </ArticleLayout.Main>
        <ArticleLayout.Footer>
          <Grid container>
            <Grid size={2}>
              <img src={AvatarImage} alt="Avatar" />
            </Grid>
            <Grid size={8}>
              <Typography component="h2" variant="h6" gutterBottom>Michelle Appleton</Typography>
              <Typography component="p">28 Jun 2020</Typography>
            </Grid>
            <Grid size={8}>
              <Button>{shareIcon}</Button>
            </Grid>
          </Grid>
        </ArticleLayout.Footer>
      </ArticleLayout>
    );
}

export default ArticlePreview;