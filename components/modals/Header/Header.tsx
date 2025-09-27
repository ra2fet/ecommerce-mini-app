'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { CartIcon } from '../../molecules';
import { FavoritesButton } from '../../molecules';
import { CartPopup, FavoritesPopup } from '..';

const Header  = () => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const handleOpenFavorites = () => {
    setIsFavoritesOpen(true);
  };

  const handleCloseFavorites = () => {
    setIsFavoritesOpen(false);
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My E-commerce App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CartIcon />
          <FavoritesButton onClick={handleOpenFavorites} />
        </Box>
      </Toolbar>
      <CartPopup />
      <FavoritesPopup isOpen={isFavoritesOpen} onClose={handleCloseFavorites} />
    </AppBar>
  );
};

export default Header;
