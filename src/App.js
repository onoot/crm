import React, { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';
import { deepmerge } from '@mui/utils';

import AppRouter from './components/AppRouter';
import { NotificationProvider } from './contex';

import { inputsCustomizations } from './shared-theme/customizations/inputs';
import { dataDisplayCustomizations } from './shared-theme/customizations/dataDisplay';
import { feedbackCustomizations } from './shared-theme/customizations/feedback';
import { navigationCustomizations } from './shared-theme/customizations/navigation';
import { surfacesCustomizations } from './shared-theme/customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './shared-theme/themePrimitives';
import ColorModeSelect from './shared-theme/ColorModeSelect';


function App() {
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('customPrimary') || '#1976d2';
  });

  const customColorSchemes = useMemo(() => {
    return {
      light: {
        palette: {
          primary: { 
            main: primaryColor,
            light: primaryColor, 
            dark: primaryColor,   
          },
          secondary: { main: '#9c27b0' },
          ...colorSchemes.light.palette,
        },
      },
      dark: {
        palette: {
          primary: { 
            main: primaryColor,
            light: primaryColor,
            dark: primaryColor,
          },
          secondary: { main: '#9c27b0' },
          ...colorSchemes.dark.palette,
        },
      },
    };
  }, [primaryColor]);

  const theme = useMemo(() => {
    const baseTheme = createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'app',
      },
      colorSchemes: customColorSchemes,
      typography,
      shadows,
      shape,
    });

    const themeWithComponents = deepmerge(baseTheme, {
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
            '*': {
              transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, fill 0.2s ease',
            },
          },
        },
      },
    });

    return themeWithComponents;
  }, [customColorSchemes]);

 
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange={false}>
      <CssBaseline />
      
      {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }} /> */}
      
      <BrowserRouter>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;