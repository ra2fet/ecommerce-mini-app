'use client';

import React from 'react';
import { Button, Menu, MenuItem, IconButton, Tooltip, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useI18n } from '../../../store/providers/I18nProvider';

const LanguageSwitcher = () => {
  const { locale, setLocale, messages } = useI18n();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (newLocale: 'en' | 'es' | 'ar') => {
    setLocale(newLocale);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
      <Tooltip title="Change my Language">
        <IconButton
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleChangeLanguage('en')} selected={locale === 'en'}>English</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage('es')} selected={locale === 'es'}>Spanish</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage('ar')} selected={locale === 'ar'}>Arabic</MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
