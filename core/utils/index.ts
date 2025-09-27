  
import { Product, CartItem, FilterOptions, SortOption } from '../types';
import { CURRENCY_SYMBOLS, SORT_OPTIONS } from '../constants';

/**
 * Format currency with proper symbol and locale
 * Single Responsibility: Currency formatting
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
          const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || '$';
    return `${symbol}${amount.toFixed(2)}`;
  }
};

/**
 * Calculate discount percentage
 * Single Responsibility: Discount calculation
 */
export const calculateDiscountPercentage = (
  originalPrice: number, 
  currentPrice: number
): number => {
  if (originalPrice <= 0 || currentPrice < 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Generate safe slugs for URLs
 * Single Responsibility: URL slug generation
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Debounce function for search and other operations
 * Single Responsibility: Function debouncing
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Deep clone objects safely
 * Single Responsibility: Object cloning
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj as T;
  }
  return obj;
};

/**
 * Validate email format
 * Single Responsibility: Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate unique IDs
 * Single Responsibility: ID generation
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if a product is in stock
 * Single Responsibility: Stock validation
 */
export const isInStock = (product: Product, quantity: number = 1): boolean => {
  return product.stock >= quantity;
};

/**
 * Calculate cart total amount
 * Single Responsibility: Cart calculation
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Calculate total items in cart
 * Single Responsibility: Cart item count
 */
export const calculateCartItemCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Filter products based on criteria
 * Single Responsibility: Product filtering
 */
export const filterProducts = (
  products: Product[], 
  filters: FilterOptions,
  searchQuery: string = ''
): Product[] => {
  return products.filter(product => {
          if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

          if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

          if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

          if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

          if (product.rating < filters.rating) {
      return false;
    }

          if (filters.inStock && product.stock <= 0) {
      return false;
    }

          if (filters.onSale && !product.isOnSale) {
      return false;
    }

    return true;
  });
};

/**
 * Sort products based on sort option
 * Single Responsibility: Product sorting
 */
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating_desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return sorted;
  }
};

/**
 * Paginate array of items
 * Single Responsibility: Pagination
 */
export const paginate = <T>(
  items: T[], 
  page: number, 
  limit: number
): { items: T[]; totalPages: number; total: number } => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);

  return {
    items: paginatedItems,
    totalPages,
    total: items.length
  };
};

/**
 * Truncate text with ellipsis
 * Single Responsibility: Text truncation
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Format date to readable string
 * Single Responsibility: Date formatting
 */
export const formatDate = (date: string | Date, locale: string = 'en-US'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Check if device is mobile based on screen width
 * Single Responsibility: Device detection
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Local storage utility with error handling
 * Single Responsibility: Local storage management
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      if (typeof window === 'undefined') return defaultValue || null;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue || null);
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error);
      return false;
    }
  }
};