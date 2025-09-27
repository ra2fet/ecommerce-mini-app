  'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

  interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  animate?: boolean;
  fullWidth?: boolean;
}

  const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'animate' && prop !== 'customVariant',
})<{ animate?: boolean; customVariant?: string }>(({ theme, customVariant }) => ({
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.2s ease-in-out',
  
      ...(customVariant === 'primary' && {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)',
      boxShadow: '0 4px 8px 2px rgba(33, 203, 243, .4)',
      transform: 'translateY(-1px)',
    },
  }),
  
  ...(customVariant === 'secondary' && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      transform: 'translateY(-1px)',
    },
  }),
  
  ...(customVariant === 'outline' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      transform: 'translateY(-1px)',
    },
  }),
  
  ...(customVariant === 'text' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '10',
    },
  }),
}));

  const buttonVariants = {
  tap: { scale: 0.95 },
  hover: { scale: 1.02 },
  initial: { scale: 1 },
};

/**
 * Custom Button component implementing atomic design principles
 * Features: Loading states, animations, custom variants, accessibility
 * Following SOLID principles - Single Responsibility, Open/Closed
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  animate = true,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
      const getMuiVariant = (): MuiButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'contained';
      case 'outline':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && !disabled && onClick) {
      onClick(event);
    }
  };

  const buttonContent = (
    <StyledButton
      variant={getMuiVariant()}
      size={size}
      disabled={disabled || loading}
      onClick={handleClick}
      animate={animate}
      customVariant={variant}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );

      if (animate && !disabled && !loading) {
    return (
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        style={{ display: 'inline-block' }}
      >
        {buttonContent}
      </motion.div>
    );
  }

  return buttonContent;
};

export default Button;