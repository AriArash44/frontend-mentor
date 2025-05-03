import * as React from 'react';
import Togglable from './Togglable';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
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

export default function Aside() {
    const [state, setState] = React.useState(false);
    const toggleDrawer = (open) => () => {
        setState(open);
    };
    const ch1_icons = [<QRcodeIcon/>, <Blog/>, <Profile/>, <Recipe/>];
    const ch2_icons = [<Cart/>, <Cards/>, <Testimonial/>];
    const list = () => (
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <Typography component='h1' variant='h4' sx={{
          marginTop: 2,
          marginLeft: 2,
          marginBottom: 4
        }}>Project</Typography>
        <Togglable header="Chapter 1">
          <List>
            {['1.QRcode', '2.blogPreview', '3.socialProfiles', '4.recipePage'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {ch1_icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Togglable>
        <Divider />
        <List>
          <Togglable header="Chapter 2">
            {['5.productPreview', '6.fourCard', '7.testimonialsgrid'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {ch2_icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </Togglable>
        </List>
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
            marginLeft: '15px'
          }}><MenuIcon/></Button>
          <Drawer
            anchor={'left'}
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      </div>
    );
}