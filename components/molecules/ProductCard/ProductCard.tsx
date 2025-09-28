  'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Chip,
  Rating,
} from '@mui/material';
import {
  FavoriteOutlined,
  Favorite,
  ShoppingCartOutlined,
  Visibility,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Product } from '../../../core/types';
import { Button } from '../../atoms';
import { formatCurrency } from '../../../core/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  onViewDetails: (productId: string) => void;
  isFavorite?: boolean;
  showQuickView?: boolean;
}

 
const ProductCard = ({
  product,
  onAddToCart,
  onToggleFavorite,
  onViewDetails,
  isFavorite = false,
  showQuickView = true,
}:ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(product.id);
  };

  const handleViewDetails = () => {
    onViewDetails(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
        }}
      >
         {product.isOnSale && (
          <Chip
            label={`${product.salePercentage}% OFF`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 1,
              fontWeight: 'bold',
            }}
          />
        )}

         <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          {isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteOutlined />
          )}
        </IconButton>

         <CardMedia
          component="img"
          height="240"
          image={product.imageUrl}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={handleViewDetails}
        />

         <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </Typography>

           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={product.rating}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography
              variant="caption"
              sx={{ ml: 1, color: 'text.secondary' }}
            >
              ({product.reviewCount})
            </Typography>
          </Box>

           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              component="span"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {formatCurrency(product.price)}
            </Typography>
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography
                variant="body2"
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                {formatCurrency(product.originalPrice)}
              </Typography>
            )}
          </Box>

           <Typography
            variant="caption"
            color={product.stock > 0 ? 'success.main' : 'error.main'}
            sx={{ fontWeight: 500 }}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </Typography>
        </CardContent>

         <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="primary"
            size="small"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            fullWidth
          >
            Add to Cart
          </Button>
          
        
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProductCard;