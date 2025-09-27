import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../../../store';
import { 
  selectFavorites, 
  removeFromFavorites,
  fetchFavoriteProducts,
  selectFavoritesLoading,
  selectFavoritesError
} from '../../../store/slices/favoritesSlice';
import { selectProducts, fetchProducts } from '../../../store/slices/productsSlice';
import Modal from '../../atoms/Modal/Modal';
import { Product } from '../../../core/types';   
interface FavoritesPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesPopup  = ({ isOpen, onClose }:FavoritesPopupProps) => {
  const dispatch = useAppDispatch();
  const favoriteProductIds = useAppSelector(selectFavorites);
  const allProducts = useAppSelector(selectProducts);
  const favoritesLoading = useAppSelector(selectFavoritesLoading);
  const favoritesError = useAppSelector(selectFavoritesError);

      const favoriteProducts = allProducts.filter(product => favoriteProductIds.includes(product.id));

  React.useEffect(() => {
          if (isOpen && allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [isOpen, allProducts.length, dispatch]);

  const handleRemoveFavorite = (productId: string) => {
    dispatch(removeFromFavorites(productId));
  };

  if (favoritesLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Your Favorite Items">
        <Typography sx={{ p: 2 }}>Loading favorites...</Typography>
      </Modal>
    );
  }

  if (favoritesError) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Your Favorite Items">
        <Typography color="error" sx={{ p: 2 }}>Error loading favorites: {favoritesError}</Typography>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Favorite Items">
      {favoriteProducts.length === 0 ? (
        <Typography variant="subtitle1" sx={{ p: 2 }}>
          You haven't added any items to your favorites yet.
        </Typography>
      ) : (
        <Box>
          <List>
            {favoriteProducts.map((product: Product) => (
              <ListItem
                key={product.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFavorite(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={product.name}
                  secondary={`$${product.price.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Continue Shopping
            </Button>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default FavoritesPopup;
