import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import PriceRangeFilter from '../PriceRangeFilter/PriceRangeFilter';

interface FilterPanelProps {
  initialCategory: string;
  initialMinPrice: number;
  initialMaxPrice: number;
  categories: string[];
  onFilterChange: (category: string, minPrice: number, maxPrice: number) => void;
}

const FilterPanel = ({
  initialCategory,
  initialMinPrice,
  initialMaxPrice,
  categories,
  onFilterChange,
}: FilterPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category, minPrice, maxPrice);
  };

  const handlePriceChange = (newMin: number, newMax: number) => {
    setMinPrice(newMin);
    setMaxPrice(newMax);
    onFilterChange(selectedCategory, newMin, newMax);
  };

  const handleClearFilters = () => {
    setSelectedCategory(initialCategory);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    onFilterChange(initialCategory, initialMinPrice, initialMaxPrice);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
      </Box>
      <Button variant="outlined" onClick={handleClearFilters} fullWidth>
        Clear Filters
      </Button>
    </Paper>
  );
};

export default FilterPanel;
