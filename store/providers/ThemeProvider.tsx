'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

  const theme = createTheme({
  palette: {
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
});

/**
 * Custom Theme Provider wrapper component
 * Isolates MUI theme creation on the client side
 */
export const CustomThemeProvider  = ({ children }:CustomThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};