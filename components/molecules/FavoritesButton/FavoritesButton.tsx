import React from 'react';
import { IconButton, Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from '../../../store';
import { selectFavoritesCount } from '../../../store/slices/favoritesSlice';

interface FavoritesButtonProps {
  onClick: () => void;
}

const FavoritesButton  = ({ onClick }:FavoritesButtonProps) => {
  const favoriteCount = useAppSelector(selectFavoritesCount);

  return (
    <IconButton color="inherit" onClick={onClick} aria-label="show favorite items">
      <Badge badgeContent={favoriteCount} color="error">
        <FavoriteIcon />
      </Badge>
    </IconButton>
  );
};

export default FavoritesButton;
