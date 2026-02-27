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

import { useTheme } from '@mui/material/styles';


export function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });
  
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('customPrimary') || null;
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
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      colorSchemes: customColorSchemes,
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
          },
        },
      },
    });
  }, [customColorSchemes, typography, shadows, shape]); 

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
            <AppRouter />
          </NotificationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;