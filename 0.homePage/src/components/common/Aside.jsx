import * as React from 'react';
import Togglable from './Togglable';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/MenuRounded';
import QRcodeIcon from '@mui/icons-material/QrCode2Rounded';
import Blog from '@mui/icons-material/Book';
import Profile from '@mui/icons-material/Contacts';
import Recipe from '@mui/icons-material/LocalDining';
import Cart from '@mui/icons-material/AddShoppingCart';
import Cards from '@mui/icons-material/Dashboard';
import Testimonial from '@mui/icons-material/FormatQuote';
import { Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

const commonStyles = `
    text-decoration: none;
    width: 100%;
    color: #333333;
`;

const StyledA = styled("a")(commonStyles);

const menuItems = [
    {
        header: "Chapter 1",
        items: ["1.QRcode", "2.blogPreview", "3.socialProfiles", "4.recipePage"],
        icons: [<QRcodeIcon />, <Blog />, <Profile />, <Recipe />],
    },
    {
        header: "Chapter 2",
        items: ["5.productPreview", "6.fourCard", "7.testimonialsgrid"],
        icons: [<Cart />, <Cards />, <Testimonial />],
    },
];

const MenuList = ({ header, items, icons }) => (
    <Togglable header={header}>
      <List sx={{
        backgroundColor: "#EEEEEE"
      }}>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding>
            <StyledA href={`/frontend-mentor/${text}`}>
              <ListItemButton sx={{
                width: '100%'
              }}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </StyledA>
          </ListItem>
        ))}
      </List>
    </Togglable>
);

export default function Aside() {
    const [state, setState] = React.useState(false);
    const toggleDrawer = (open) => () => {
        setState(open);
    };
    const list = () => (
        <Box sx={{ width: 250 }} role="presentation">
          <Typography component="h1" variant="h4" sx={{ marginTop: 2, marginLeft: 2, marginBottom: 4 }}>
            Project
          </Typography>
          {menuItems.map(({ header, items, icons }) => (
            <React.Fragment key={header}>
              <MenuList header={header} items={items} icons={icons} />
            </React.Fragment>
          ))}
        </Box>
    );
    return (
      <div>
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer(true)} sx={{
            color: '#333333',
            border: '1px solid #333333',
            borderRadius: '9999px',
            minWidth: '50px',
            minHeight: '50px',
            padding: 0,
            marginTop: '15px',
            marginLeft: '15px',
          }}>
            <MenuIcon />
          </Button>
          <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
      </div>
    );
}