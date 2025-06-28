import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useMediaQuery, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import DrawerMui from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/MenuRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import QRcodeIcon from '@mui/icons-material/QrCode2Rounded';
import Blog from '@mui/icons-material/Book';
import Profile from '@mui/icons-material/Contacts';
import Recipe from '@mui/icons-material/LocalDining';
import Cart from '@mui/icons-material/AddShoppingCart';
import Cards from '@mui/icons-material/Dashboard';
import Testimonial from '@mui/icons-material/FormatQuote';
import Togglable from './Togglable';
import Newspaper from '@mui/icons-material/Newspaper';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalculateIcon from '@mui/icons-material/Calculate';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const drawerWidth = 275;

const openedMixin = {
    width: drawerWidth,
    transition: 'width 0.3s ease-out',
    overflowX: 'hidden',
};

const closedMixin = {
    transition: 'width 0.3s ease-in',
    overflowX: 'hidden',
    width: '57px'
};

const DrawerHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    minHeight: '64px'
});

const MiniDrawerStyled = styled(DrawerMui, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? {
        ...openedMixin,
        '& .MuiDrawer-paper': {
            ...openedMixin
        }
    } : {
        ...closedMixin,
        '& .MuiDrawer-paper': {
            ...closedMixin
        }
    })
}));

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
        icons: [<QRcodeIcon />, <Blog />, <Profile />, <Recipe />]
    },
    {
        header: "Chapter 2",
        items: ["5.productPreview", "6.fourCard", "7.testimonialsGrid"],
        icons: [<Cart />, <Cards />, <Testimonial />]
    },
    {
        header: "Chapter 3",
        items: ["8.articlePreview", "9.newsletterSignup", "10.TTDashboard", "11.tipCalculator"],
        icons: [<Cart />, <Newspaper />, <AccessAlarmIcon />, <CalculateIcon /> ]
    },
    {
        header: "Chapter 4",
        items: ["12.ratingComponent", "13.qaAccordion" ],
        icons: [<RateReviewIcon />, <LiveHelpIcon /> ]
    }
];

const absoluteLinks = {
    "12.ratingComponent" : "https://12-rating-component.vercel.app/"
};

const MenuListFull = () => (
    <>
      {menuItems.map(({ header, items, icons }) => (
        <Togglable header={header} key={header}>
          <List>
            {items.map((text, index) => (
              <ListItem key={text} disablePadding>
                <StyledA href={Object.keys(absoluteLinks).includes(text) ? absoluteLinks[text] : `/frontend-mentor/${text}`}>
                  <ListItemButton sx={{ justifyContent: 'initial', px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                      {icons[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </StyledA>
              </ListItem>
            ))}
          </List>
        </Togglable>
      ))}
    </>
);

const MenuListMini = ({ showText }) => (
    <>
      {menuItems.map(({ items, icons }, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: showText ? 'flex-start' : 'center' }}>
          {items.map((text, idx) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <StyledA href={Object.keys(absoluteLinks).includes(text) ? absoluteLinks[text] : `/frontend-mentor/${text}`}>
                <ListItemButton sx={{ justifyContent: showText ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: showText ? 3 : 'auto', justifyContent: 'center' }}>
                    {icons[idx]}
                  </ListItemIcon>
                  {showText && <ListItemText primary={text} />}
                </ListItemButton>
              </StyledA>
            </ListItem>
          ))}
          {index < menuItems.length - 1 && <Divider sx={{ my: 1, width: '100%' }} />}
        </Box>
      ))}
    </>
);

const Aside = React.forwardRef((props, ref) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(min-width:600px) and (max-width:900px)');
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleMobileDrawer = (open) => () => setMobileOpen(open);
    const [tabletOpen, setTabletOpen] = React.useState(false);
    const handleTabletToggle = () => setTabletOpen(prev => !prev);
    const fullListContent = (
      <Box sx={{ width: drawerWidth }} role="presentation">
        <Box sx={{ p: 2 }}>
          <Typography component="h1" variant={isMobile ? 'h6' : 'h5'} sx={{ marginBottom: isDesktop ? 3 : 1 }}>
            Projects
          </Typography>
        </Box>
        <MenuListFull />
      </Box>
    );
    return (
      <>
        <CssBaseline />
        {isMobile && (
          <Button
            onClick={toggleMobileDrawer(true)}
            sx={{
              color: '#333333',
              border: '1px solid #333333',
              borderRadius: '9999px',
              minWidth: '50px',
              minHeight: '50px',
              p: 0,
              mt: '15px',
              ml: '15px',
              position: 'relative',
              zIndex: 10
            }}
          >
            <MenuIcon />
          </Button>
        )}
        {isDesktop && (
          <Box ref={ref} sx={{ position: 'fixed', left: 0, top: 0, width: drawerWidth, height: '100vh', backgroundColor: 'transparent', outline: '1px solid #E9E9E9', background: "#F8F8F8", overflowY: 'auto' }}>
            {fullListContent}
          </Box>
        )}
        {isTablet && (
          <MiniDrawerStyled ref={ref} variant="permanent" open={tabletOpen}>
            <DrawerHeader>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: tabletOpen ? 'space-between' : 'center', width: '100%', padding: '0 8px' }}>
                {tabletOpen && (
                  <Typography variant="h6" noWrap>
                    Projects
                  </Typography>
                )}
                <IconButton onClick={handleTabletToggle}>
                  {tabletOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
              </Box>
            </DrawerHeader>
            <Divider />
            <MenuListMini showText={tabletOpen} />
          </MiniDrawerStyled>
        )}
        {isMobile && (
          <DrawerMui
            anchor="left"
            open={mobileOpen}
            onClose={toggleMobileDrawer(false)}
            sx={{
              '& .MuiDrawer-paper': { backgroundColor: 'white', width: drawerWidth }
            }}
          >
            {fullListContent}
          </DrawerMui>
        )}
      </>
    );
})

export default Aside;