  
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../infrastructure/api';
import { Product, CartItem, FilterOptions } from '../../core/types';

  export const queryKeys = {
  products: ['products'] as const,
  productDetail: (id: string) => ['products', 'detail', id] as const,
  categories: ['categories'] as const,
  cart: ['cart'] as const,
  favorites: ['favorites'] as const,
};

  export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => api.products.getProducts(params),
    select: (response) => response.data,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.productDetail(id),
    queryFn: () => api.products.getProductById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

  export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => api.categories.getCategories(),
    select: (response) => response.data,
  });
};

  export const useCart = () => {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: () => api.cart.getCartItems(),
    select: (response) => response.data,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (item: { productId: string; quantity: number; price: number }) => 
      api.cart.addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
};

  export const useFavorites = () => {
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: () => api.favorites.getFavorites(),
    select: (response) => response.data,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, isFavorite }: { productId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        return api.favorites.removeFromFavorites(productId);
      } else {
        return api.favorites.addToFavorites(productId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
    },
  });
};