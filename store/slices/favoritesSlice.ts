  import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { FavoritesState, Product } from '../../core/types';
import { api } from '../../infrastructure/api';

  const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

  export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const response = await api.favorites.getFavorites();
    return response.data.map(item => item.productId);
  }
);

export const fetchFavoriteProducts = createAsyncThunk(
  'favorites/fetchFavoriteProducts',
  async () => {
    const response = await api.favorites.getFavoriteProducts();
    return response.data;
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (productId: string) => {
    await api.favorites.addToFavorites(productId);
    return productId;
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (productId: string) => {
    await api.favorites.removeFromFavorites(productId);
    return productId;
  }
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (productId: string, { getState }) => {
    const state = getState() as { favorites: FavoritesState };
    const isFavorite = state.favorites.items.includes(productId);
    
    if (isFavorite) {
      await api.favorites.removeFromFavorites(productId);
      return { productId, action: 'remove' };
    } else {
      await api.favorites.addToFavorites(productId);
      return { productId, action: 'add' };
    }
  }
);

  const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
          optimisticAddToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },

    optimisticRemoveFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(id => id !== action.payload);
    },

    optimisticToggleFavorite: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      
      if (index === -1) {
        state.items.push(productId);
      } else {
        state.items.splice(index, 1);
      }
    },

          clearError: (state) => {
      state.error = null;
    },

          clearFavorites: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
          builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      });

          builder
      .addCase(fetchFavoriteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((product: Product) => product.id);
      })
      .addCase(fetchFavoriteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorite products';
      });

          builder
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.items.includes(action.payload)) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add to favorites';
      });

          builder
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(id => id !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove from favorites';
      });

          builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, action: favoriteAction } = action.payload;
        
        if (favoriteAction === 'add') {
          if (!state.items.includes(productId)) {
            state.items.push(productId);
          }
        } else {
          state.items = state.items.filter(id => id !== productId);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle favorite';
      });
  },
});

  export const {
  optimisticAddToFavorites,
  optimisticRemoveFromFavorites,
  optimisticToggleFavorite,
  clearError,
  clearFavorites,
} = favoritesSlice.actions;

  export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;
export const selectFavoritesLoading = (state: { favorites: FavoritesState }) => state.favorites.loading;
export const selectFavoritesError = (state: { favorites: FavoritesState }) => state.favorites.error;

  export const selectIsFavorite = (state: { favorites: FavoritesState }, productId: string) =>
  state.favorites.items.includes(productId);

export const selectFavoritesCount = (state: { favorites: FavoritesState }) =>
  state.favorites.items.length;

  export const selectFavoriteStatus = createSelector(
  [selectFavorites, (_, productIds: string[]) => productIds],
  (favorites, productIds) => {
    const status: { [key: string]: boolean } = {};
    productIds.forEach(id => {
      status[id] = favorites.includes(id);
    });
    return status;
  }
);

export default favoritesSlice.reducer;