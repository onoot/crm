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
import { styled } from '@mui/material/styles';
import { AppBar } from '../../UI/headerAppBar';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';

const StyledAppBar = styled(AppBar)(({ theme, opensib }) => ({
  minHeight: '4.6875rem',
  display: 'flex',
  alignItems: 'center',
  paddingTop: '0rem',
  paddingBottom: '0.5rem',
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: '0.75rem',
  margin: 'auto',
  width: '100%',
  
  [theme.breakpoints.up('sm')]: {
    maxWidth: opensib === false ? 'calc(88svw - 240px)' : '88svw',
  },
  
  mx: 'auto',
  mb: 2,
  
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  
  ...theme.applyStyles('dark', {
  boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,

  }),
}));

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
    <StyledAppBar
      opensib={openSib}
      position={shouldStick ? "sticky" : "static"} 
      elevation={0}
      sx={{
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
       
      }}
    >
      <Toolbar sx={{ 
        width: '100%', 
        justifyContent: 'space-between',
        paddingLeft: { xs: 2, sm: 3 },
        paddingRight: { xs: 2, sm: 3 },
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ 
              color: 'inherit',
              '& .MuiBreadcrumbs-separator': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <Link
              color="inherit"
              href="#/"
              underline="hover"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: theme.palette.primary.main,
                '&:hover': {
                  color: theme.palette.primary.dark,
                }
              }}
            >
              <HomeIcon fontSize="small" />
            </Link>
            <Typography 
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              {breadcrumbText}
            </Typography>
          </Breadcrumbs>
          
          <Typography
            variant="h5"
            noWrap
            sx={{
              mt: 0.5,
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
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
            <IconButton 
              size="small" 
              sx={{ 
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                padding: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          )}
          
          <IconButton 
            size="small" 
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              padding: 1,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
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
              sx={{ 
                color: theme.palette.text.secondary,
                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                padding: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.text.secondary, 0.2),
                  color: theme.palette.primary.main,
                }
              }}
              onClick={onOpen} 
            >
              <SettingsIcon />
            </IconButton>
          )}
          
          {showNotifications && (
            <IconButton 
              size="small" 
              sx={{ 
                color: theme.palette.text.secondary,
                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                padding: 1,
                position: 'relative',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.text.secondary, 0.2),
                  color: theme.palette.primary.main,
                }
              }}
            >
              <NotificationsIcon />
              {shouldStick && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.error.main,
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                />
              )}
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default PageHeader;