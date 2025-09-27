  
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState, Product } from '../../core/types';
import { api } from '../../infrastructure/api';
import { calculateCartTotal, calculateCartItemCount } from '../../core/utils';

  const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  totalAmount: 0,
  totalItems: 0,
  isOpen: false,
};

  export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const response = await api.cart.getCartItems();
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1, price, selectedVariant }: {
    productId: string;
    quantity?: number;
    price: number;
    selectedVariant?: any;
  }) => {
    const cartItem = {
      productId,
      quantity,
      price,
      selectedVariant,
    };
    const response = await api.cart.addToCart(cartItem);
    return response.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }: { id: string; quantity: number }) => {
    const response = await api.cart.updateQuantity(id, quantity);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id: string) => {
    await api.cart.removeFromCart(id);
    return id;
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async () => {
    await api.cart.clearCart();
    return [];
  }
);

  const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
          toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

          updateTotals: (state) => {
      state.totalAmount = calculateCartTotal(state.items);
      state.totalItems = calculateCartItemCount(state.items);
    },

          clearError: (state) => {
      state.error = null;
    },

          optimisticAddToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => 
        item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalAmount = calculateCartTotal(state.items);
      state.totalItems = calculateCartItemCount(state.items);
    },

    optimisticUpdateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
        state.totalAmount = calculateCartTotal(state.items);
        state.totalItems = calculateCartItemCount(state.items);
      }
    },

    optimisticRemoveFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalAmount = calculateCartTotal(state.items);
      state.totalItems = calculateCartItemCount(state.items);
    },
  },
  extraReducers: (builder) => {
          builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalAmount = calculateCartTotal(action.payload);
        state.totalItems = calculateCartItemCount(action.payload);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart items';
      });

          builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        
                  const existingItemIndex = state.items.findIndex(item => 
          item.productId === action.payload.productId
        );

        if (existingItemIndex !== -1) {
                      state.items[existingItemIndex].quantity += action.payload.quantity;
        } else {
                      state.items.push(action.payload);
        }

        state.totalAmount = calculateCartTotal(state.items);
        state.totalItems = calculateCartItemCount(state.items);
                })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      });

          builder
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload) {
          const index = state.items.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }

        state.totalAmount = calculateCartTotal(state.items);
        state.totalItems = calculateCartItemCount(state.items);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update cart item';
      });

          builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalAmount = calculateCartTotal(state.items);
        state.totalItems = calculateCartItemCount(state.items);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove item from cart';
      });

          builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalAmount = 0;
        state.totalItems = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to clear cart';
      });
  },
});

  export const {
  toggleCart,
  openCart,
  closeCart,
  updateTotals,
  clearError,
  optimisticAddToCart,
  optimisticUpdateQuantity,
  optimisticRemoveFromCart,
} = cartSlice.actions;

  export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartLoading = (state: { cart: CartState }) => state.cart.loading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.totalAmount;
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;

  export const selectCartItemById = (state: { cart: CartState }, id: string) =>
  state.cart.items.find(item => item.id === id);

export const selectCartItemByProductId = (state: { cart: CartState }, productId: string) =>
  state.cart.items.find(item => item.productId === productId);

export const selectIsInCart = (state: { cart: CartState }, productId: string) =>
  state.cart.items.some(item => item.productId === productId);

export const selectCartItemQuantity = (state: { cart: CartState }, productId: string) => {
  const item = state.cart.items.find(item => item.productId === productId);
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;
