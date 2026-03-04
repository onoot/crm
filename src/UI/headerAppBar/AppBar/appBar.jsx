import { styled } from '@mui/material/styles';
import { 
  Box, 
  AppBar as MuiAppBar, 
  Breadcrumbs,
  TextField, 
  Toolbar, 
  Typography, 
  IconButton, 
  Link,
  useTheme,
  useScrollTrigger,
  alpha,
} from '@mui/material';

import {
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  MenuOpen,
} from '@mui/icons-material';

const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));