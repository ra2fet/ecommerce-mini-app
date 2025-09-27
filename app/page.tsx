'use client';

import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  fetchProducts, 
  selectProducts, 
  selectProductsLoading, 
  selectProductsError 
} from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { 
  fetchFavorites,
  toggleFavorite, 
  selectFavoriteStatus 
} from '../store/slices/favoritesSlice';
import { ProductCard, FilterPanel } from '../components/molecules';
import { SearchInput } from '../components/atoms';
import { motion, AnimatePresence } from 'framer-motion';

  const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1 }
  })
};

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleFilterChange = useCallback((category: string, minPrice: number, maxPrice: number) => {
    setFilters({ category, minPrice, maxPrice });
  }, []);

      const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

      const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, filters]);

      const productIds = useMemo(() => filteredProducts.map(product => product.id), [filteredProducts]);

      const favoriteStatus = useAppSelector(state => selectFavoriteStatus(state, productIds));

      const handleAddToCart = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    dispatch(addToCart({
      productId: product.id,
      quantity: 1,
      price: product.price,
    }));
  }, [dispatch, products]);

  const handleToggleFavorite = useCallback((productId: string) => {
    dispatch(toggleFavorite(productId));     }, [dispatch]);

      const handleViewDetails = useCallback((productId: string) => {
    console.log(`Navigating to product details: ${productId}`);
        }, []);

      if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

      if (error) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" color="error.main">
          {error || 'Failed to load products. Please try again later.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6
      }}
    >
      <AnimatePresence>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
        
          <Box
            sx={{
              textAlign: 'center',
              mb: 8
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Welcome to Our Store
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Explore our products
            </Typography>
          </Box>

          {/* My filter zone */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={4}>
            <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 250 } }}>
              <FilterPanel
                initialCategory="all"
                initialMinPrice={0}
                initialMaxPrice={1000}
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => setSearchTerm('')}
              />
              {/* products start */}
              <Grid container spacing={3} mt={2}>
                {filteredProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <motion.div
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={handleViewDetails}
                        isFavorite={favoriteStatus[product.id] ?? false}
                        showQuickView
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>


       
          {!filteredProducts.length && (
            <Box
              sx={{
                textAlign: 'center',
                py: 10
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mb: 2
                }}
              >
                No products found matching your criteria.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search or filters.
              </Typography>
            </Box>
          )}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Home;
