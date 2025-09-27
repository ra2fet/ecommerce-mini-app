import React from 'react';
import { Box, Typography, Button, Divider, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../../../store';
import { 
  selectCartItems, 
  selectCartTotal, 
  selectCartIsOpen, 
  closeCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart
} from '../../../store/slices/cartSlice';
import { selectProducts } from '../../../store/slices/productsSlice';   import Modal from '../../atoms/Modal/Modal';

const CartPopup = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const isCartOpen = useAppSelector(selectCartIsOpen);
  const allProducts = useAppSelector(selectProducts);   
  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    dispatch(updateCartItemQuantity({ id: itemId, quantity }));
  };

  return (
    <Modal isOpen={isCartOpen} onClose={handleCloseCart} title="Your Shopping Cart">
      {cartItems.length === 0 ? (
        <Typography variant="subtitle1" sx={{ p: 2 }}>
          Your cart is currently empty.
        </Typography>
      ) : (
        <Box>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item.id!)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={allProducts.find(product => product.id === item.productId)?.name || item.productId}
                  secondary={`Quantity: ${item.quantity} x $${item.price.toFixed(2)}`}
                />
               </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ px: 2, pb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button variant="contained" color="primary" disabled>
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default CartPopup;
