'use client';

import React, { createContext, useMemo, useState, useContext, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode, CssBaseline } from '@mui/material';

interface CustomThemeProviderProps {
  children: ReactNode;
}

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});


export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4D01FFFF',
          },
          secondary: {
            main: '#FF9800',
          },
        },
        typography: {
          fontFamily: ['Geist', 'sans-serif'].join(','),
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
