 
import { Product, CartItem, FavoriteItem, Category, ApiResponse, FilterOptions, PaginationInfo } from '../../core/types';
import { API_ENDPOINTS } from '../../core/constants';

 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

 
class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Network error');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Initialize HTTP client
const httpClient = new HttpClient(API_BASE_URL);

/**
 * Product Service - handles all product-related API calls
 * Single Responsibility: Product data management
 */
export class ProductService {
  static async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
  }): Promise<ApiResponse<Product[]>> {
    return httpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS, params);
  }

  static async getProductById(id: string): Promise<ApiResponse<Product>> {
    return httpClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  }

  static async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    return httpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS, { category });
  }

  static async searchProducts(query: string, filters?: FilterOptions): Promise<ApiResponse<Product[]>> {
    const params = {
      q: query,
      ...filters,
    };
    return httpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS, params);
  }

  static async getRelatedProducts(productId: string, limit: number = 6): Promise<ApiResponse<Product[]>> {
    return httpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS, {
      _limit: limit,
      id_ne: productId,
    });
  }
}

/**
 * Category Service - handles category-related operations
 * Single Responsibility: Category data management
 */
export class CategoryService {
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return httpClient.get<Category[]>(API_ENDPOINTS.CATEGORIES);
  }

  static async getCategoryById(id: string): Promise<ApiResponse<Category>> {
    return httpClient.get<Category>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
  }

  static async getActiveCategories(): Promise<ApiResponse<Category[]>> {
    return httpClient.get<Category[]>(API_ENDPOINTS.CATEGORIES, { isActive: true });
  }
}
 
export class CartService {
  static async getCartItems(): Promise<ApiResponse<CartItem[]>> {
    return httpClient.get<CartItem[]>(API_ENDPOINTS.CART);
  }

  static async addToCart(item: Omit<CartItem, 'id'>): Promise<ApiResponse<CartItem>> {
    const cartItem: CartItem = {
      ...item,
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    return httpClient.post<CartItem>(API_ENDPOINTS.CART, cartItem);
  }

  static async updateCartItem(id: string, updates: Partial<CartItem>): Promise<ApiResponse<CartItem>> {
    return httpClient.patch<CartItem>(`${API_ENDPOINTS.CART}/${id}`, updates);
  }

  static async removeFromCart(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<void>(`${API_ENDPOINTS.CART}/${id}`);
  }

  static async clearCart(): Promise<ApiResponse<void>> {
    const cartItems = await this.getCartItems();
    const deletePromises = cartItems.data.map((item: CartItem) => 
      httpClient.delete<void>(`${API_ENDPOINTS.CART}/${item.id}`)
    );
    
    await Promise.all(deletePromises);
    return { data: undefined as any, success: true };
  }

  static async updateQuantity(id: string, quantity: number): Promise<ApiResponse<CartItem>> {
    if (quantity <= 0) {
      await this.removeFromCart(id);
      return { data: undefined as any, success: true };
    }
    return this.updateCartItem(id, { quantity });
  }
}

/*
 *  My Favorites Service
 */
export class FavoritesService {
  static async getFavorites(): Promise<ApiResponse<FavoriteItem[]>> {
    return httpClient.get<FavoriteItem[]>(API_ENDPOINTS.FAVORITES);
  }

  static async addToFavorites(productId: string, userId: string = '1'): Promise<ApiResponse<FavoriteItem>> {
    const favoriteItem: FavoriteItem = {
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId,
      userId,
      createdAt: new Date().toISOString(),
    };
    return httpClient.post<FavoriteItem>(API_ENDPOINTS.FAVORITES, favoriteItem);
  }

  static async removeFromFavorites(productId: string): Promise<ApiResponse<void>> {
     const favorites = await this.getFavorites();
    const favoriteItem = favorites.data.find((item: FavoriteItem) => item.productId === productId);
    
    if (favoriteItem) {
      return httpClient.delete<void>(`${API_ENDPOINTS.FAVORITES}/${favoriteItem.id}`);
    }
    
    return { data: undefined as any, success: true };
  }

  static async isFavorite(productId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.data.some((item: FavoriteItem) => item.productId === productId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  static async getFavoriteProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const favorites = await this.getFavorites();
      const productPromises = favorites.data.map((favorite: FavoriteItem) => 
        ProductService.getProductById(favorite.productId)
      );
      
      const productResponses = await Promise.all(productPromises);
      const products = productResponses
        .filter((response: ApiResponse<Product>) => response.success)
        .map((response: ApiResponse<Product>) => response.data);
      
      return { data: products, success: true };
    } catch (error) {
      console.error('Error fetching favorite products:', error);
      throw error;
    }
  }
}

/* My errors Handler  */
export class ApiErrorHandler {
  static handle(error: any): { message: string; status?: number } {
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        return { message: 'Resource not found', status: 404 };
      }
      if (error.message.includes('500')) {
        return { message: 'Server error. Please try again later.', status: 500 };
      }
      if (error.message.includes('Network')) {
        return { message: 'Network error. Please check your connection.', status: 0 };
      }
      return { message: error.message };
    }
    
    return { message: 'An unexpected error occurred' };
  }
}

/* To transform my API  to  models */
export class ApiResponseTransformer {
  static transformProduct(apiProduct: any): Product {
    return {
      ...apiProduct,
      price: Number(apiProduct.price),
      originalPrice: apiProduct.originalPrice ? Number(apiProduct.originalPrice) : undefined,
      rating: Number(apiProduct.rating),
      reviewCount: Number(apiProduct.reviewCount),
      stock: Number(apiProduct.stock),
      isOnSale: Boolean(apiProduct.isOnSale),
      salePercentage: apiProduct.salePercentage ? Number(apiProduct.salePercentage) : undefined,
    };
  }

  static transformCartItem(apiCartItem: any): CartItem {
    return {
      ...apiCartItem,
      quantity: Number(apiCartItem.quantity),
      price: Number(apiCartItem.price),
    };
  }
}

 export const api = {
  products: ProductService,
  categories: CategoryService,
  cart: CartService,
  favorites: FavoritesService,
  errorHandler: ApiErrorHandler,
  transformer: ApiResponseTransformer,
};