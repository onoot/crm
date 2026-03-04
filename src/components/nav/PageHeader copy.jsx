import { 
  Box, 
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
import { AppBar } from '../../UI/headerAppBar';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';

const PageHeader = ({ 
  openSib, 
  onCloseSib, 
  isNavbarFixed, 
  onOpen, 
  onClose, 
  openHeader = false, 
  setHeader,
  breadcrumbText = 'Главная',
  pageTitle = 'Панель управления',
  showSearch = true,
  showNotifications = true,
  showSettings = true,
  showProfile = true,
  showColorMode = true,
}) => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });
  
  const shouldStick = isNavbarFixed !== undefined ? isNavbarFixed : trigger;

  return (
    <AppBar
      position={shouldStick ? "sticky" : "static"} 
      elevation={0}
      sx={{
        minHeight: '4.6875rem',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0rem',
        paddingBottom: '0.5rem',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '0.75rem',
        
        ...(shouldStick && {
          position: 'sticky',
          top: '1rem', 
          zIndex: 1100,
          boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
          backdropFilter: 'saturate(200%) blur(1.875rem)',
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
        }),
        
        ...(!shouldStick && {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }),
        
        mx: { xs: 2, sm: 3, md: 4 },
        mb: 2,
      }}
    >
      <Toolbar sx={{ 
        width: '100%', 
        justifyContent: 'space-between',
        paddingLeft: { xs: 1, sm: 2 },
        paddingRight: { xs: 1, sm: 2 },
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'inherit' }}>
            <Link
              color="inherit"
              href="#/"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon fontSize="inherit" />
            </Link>
            <Typography variant="body2">
              {breadcrumbText}
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h6"
            noWrap
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontWeight: 600,
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showSearch && (
            <TextField
              label="Поиск..."
              variant="outlined"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                }
              }}
            />
          )}
          
          {showProfile && (
            <IconButton size="small" sx={{ color: 'inherit' }}>
              <AccountCircleIcon />
            </IconButton>
          )}
          
          <IconButton 
            size="small" 
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={onCloseSib}
          >
            {!openSib ? <MenuIcon /> : <MenuOpen />}
          </IconButton>
          
          {showColorMode && (
            <ColorModeSelect />
          )}
          
          {showSettings && (
            <IconButton 
              size="small" 
              color="inherit"
              onClick={onOpen} 
            >
              <SettingsIcon />
            </IconButton>
          )}
          
          {showNotifications && (
            <IconButton 
              size="small" 
              color="inherit"
              sx={{ 
                position: 'relative',
                '&::after': shouldStick ? {
                  content: '""',
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.error.main,
                } : {}
              }}
            >
              <NotificationsIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;