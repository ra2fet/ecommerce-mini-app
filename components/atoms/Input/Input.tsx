  'use client';

import React from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

  interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'standard' | 'outlined' | 'filled';
  animate?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

  const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

  const inputVariants = {
  focus: { scale: 1.02 },
  blur: { scale: 1 },
};

/**
 * Custom Input component implementing atomic design principles
 * Features: Icons, animations, validation states
 */
const Input=  ({
  variant = 'outlined',
  animate = false,
  startIcon,
  endIcon,
  ...props
}:InputProps) => {
  const InputProps = {
    ...(startIcon && {
      startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
    }),
    ...(endIcon && {
      endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
    }),
    ...props.InputProps,
  };

  const inputContent = (
    <StyledTextField
      variant={variant}
      InputProps={InputProps}
      {...props}
    />
  );

  if (animate) {
    return (
      <motion.div
        variants={inputVariants}
        whileFocus="focus"
        initial="blur"
      >
        {inputContent}
      </motion.div>
    );
  }

  return inputContent;
};

export default Input;