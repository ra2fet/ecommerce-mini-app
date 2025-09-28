'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { CartIcon } from '../../molecules';
import { FavoritesButton } from '../../molecules';
import { CartPopup, FavoritesPopup } from '..';
import { DarkModeToggle, LanguageSwitcher } from '../../atoms';
import { useI18n } from '../../../store/providers/I18nProvider';

const Header  = () => {
  const { messages } = useI18n();
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
          {messages.navigation.home}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSwitcher />
          <DarkModeToggle />
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
