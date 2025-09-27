import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector, useAppDispatch } from '../../../store';
import { selectCartItemCount, toggleCart } from '../../../store/slices/cartSlice';

const CartIcon = () => {
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector(selectCartItemCount);

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  return (
    <IconButton color="inherit" onClick={handleCartToggle} aria-label="show cart items">
      <Badge badgeContent={itemCount} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
