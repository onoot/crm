import React, { useState, useMemo, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box,
  Typography
} from '@mui/material';

import AppRouter from './components/AppRouter';
import { ColorModeContext, NotificationProvider } from './contex'; 

import { inputsCustomizations } from './shared-theme/customizations/inputs';
import { dataDisplayCustomizations } from './shared-theme/customizations/dataDisplay';
import { feedbackCustomizations } from './shared-theme/customizations/feedback';
import { navigationCustomizations } from './shared-theme/customizations/navigation';
import { surfacesCustomizations } from './shared-theme/customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './shared-theme/themePrimitives';

function ThemeEditor() {
  const { setCustomColor, mode } = useContext(ColorModeContext);
  const [localColor, setLocalColor] = useState(localStorage.getItem('customPrimary') || '#1976d2');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    setCustomColor(newColor);
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 20, 
      left: 60, 
      zIndex: 9999, 
      bgcolor: 'background.paper',
      p: 1.5, 
      borderRadius: 2, 
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: 1
    }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
        Цвет темы:
      </Typography>
      <input 
        type="color" 
        value={localColor}
        onChange={handleColorChange}
        style={{ width: '100%', height: '40px', cursor: 'pointer' }}
      />
    </Box>
  );
}

export function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });
  
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('customPrimary') || '#1976d2';
  });

  const customColorSchemes = useMemo(() => {
    const schemes = {
      light: {
        palette: {
          ...colorSchemes.light.palette,
          primary: {
            main: primaryColor || colorSchemes.light.palette.primary.main,
          }
        }
      },
      dark: {
        palette: {
          ...colorSchemes.dark.palette,
          primary: {
            main: primaryColor || colorSchemes.dark.palette.primary.main,
          }
        }
      }
    };
    
    return schemes;
  }, [primaryColor]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: primaryColor,
        },
        secondary: {
          main: '#9c27b0',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
            '*': {
              transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, fill 0.2s ease',
            },
          },
        },
      },
    });
  }, [mode, primaryColor]); 

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => {
      setMode((prevMode) => {
        const next = prevMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', next);
        return next;
      });
    },
    setCustomColor: (hex) => {
      setPrimaryColor(hex);
      localStorage.setItem('customPrimary', hex);
    }
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider 
        theme={theme} 
        disableTransitionOnChange={false} 
      >
        <CssBaseline />
        <BrowserRouter>
          <NotificationProvider>
            <ThemeEditor />
            <AppRouter />
          </NotificationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;