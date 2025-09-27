  
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState, FilterOptions, PaginationInfo } from '../../core/types';
import { api } from '../../infrastructure/api';
import { PAGINATION_LIMITS } from '../../core/constants';

  const initialState: ProductsState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    brands: [],
    rating: 0,
    inStock: false,
    onSale: false,
  },
  searchQuery: '',
  sortBy: 'newest',
  pagination: {
    page: 1,
    limit: PAGINATION_LIMITS.PRODUCTS,
    total: 0,
    totalPages: 0,
  },
};

  
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
  }) => {
    const response = await api.products.getProducts(params);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await api.products.getProductById(id);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string) => {
    const response = await api.products.getProductsByCategory(category);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, filters }: { query: string; filters?: FilterOptions }) => {
    const response = await api.products.searchProducts(query, filters);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await api.categories.getCategories();
    return response.data;
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  'products/fetchRelatedProducts',
  async ({ productId, limit = 6 }: { productId: string; limit?: number }) => {
    const response = await api.products.getRelatedProducts(productId, limit);
    return response.data;
  }
);

  const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
          setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    setFilters: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
    },

    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.priceRange = action.payload;
    },

    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.filters.categories.indexOf(category);
      
      if (index === -1) {
        state.filters.categories.push(category);
      } else {
        state.filters.categories.splice(index, 1);
      }
    },

    toggleBrandFilter: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      const index = state.filters.brands.indexOf(brand);
      
      if (index === -1) {
        state.filters.brands.push(brand);
      } else {
        state.filters.brands.splice(index, 1);
      }
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },

    setPageLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
          builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
                  if (Array.isArray(action.payload)) {
          state.pagination.total = action.payload.length;
          state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.limit);
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });

          builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
                  const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });

          builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products by category';
      });

          builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search products';
      });

          builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });

          builder
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
                  action.payload.forEach(product => {
          const exists = state.items.some(item => item.id === product.id);
          if (!exists) {
            state.items.push(product);
          }
        });
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch related products';
      });
  },
});

  export const {
  setSearchQuery,
  setSortBy,
  setFilters,
  resetFilters,
  setPriceRange,
  toggleCategoryFilter,
  toggleBrandFilter,
  setPage,
  setPageLimit,
  clearError,
  updateProduct,
} = productsSlice.actions;

  export const selectProducts = (state: { products: ProductsState }) => state.products.items;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectCategories = (state: { products: ProductsState }) => state.products.categories;
export const selectFilters = (state: { products: ProductsState }) => state.products.filters;
export const selectSearchQuery = (state: { products: ProductsState }) => state.products.searchQuery;
export const selectSortBy = (state: { products: ProductsState }) => state.products.sortBy;
export const selectPagination = (state: { products: ProductsState }) => state.products.pagination;

  export const selectProductById = (state: { products: ProductsState }, productId: string) =>
  state.products.items.find(product => product.id === productId);

export const selectProductsByCategory = (state: { products: ProductsState }, category: string) =>
  state.products.items.filter(product => product.category === category);

export const selectSaleProducts = (state: { products: ProductsState }) =>
  state.products.items.filter(product => product.isOnSale);

export const selectInStockProducts = (state: { products: ProductsState }) =>
  state.products.items.filter(product => product.stock > 0);

export const selectFeaturedProducts = (state: { products: ProductsState }) =>
  state.products.items
    .filter(product => product.rating >= 4.5)
    .slice(0, 8);

export default productsSlice.reducer;