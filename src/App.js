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

function ThemeEditor({ onColorChange }) {
  const [localColor, setLocalColor] = useState(localStorage.getItem('customPrimary') || '#1976d2');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    onColorChange(newColor);
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

  const handleColorChange = (newColor) => {
    setPrimaryColor(newColor);
    localStorage.setItem('customPrimary', newColor);
  };

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange={false}>
      <CssBaseline />
      
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }} />
      
      <ThemeEditor onColorChange={handleColorChange} />
      
      <BrowserRouter>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;