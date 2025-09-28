'use client';

import React from 'react';
import { IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../../../store/providers/ThemeProvider';

const DarkModeToggle = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        p: 0.5,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default DarkModeToggle;
