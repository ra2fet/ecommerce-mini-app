  
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CART: '/cart',
  FAVORITES: '/favorites',
  CATEGORIES: '/categories',
  USERS: '/users'
} as const;

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  CART: '/cart',
  FAVORITES: '/favorites',
  PROFILE: '/profile'
} as const;

export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  HOME: 'home',
  SPORTS: 'sports',
  BOOKS: 'books',
  BEAUTY: 'beauty'
} as const;

export const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name A-Z' },
  { value: 'name_desc', label: 'Name Z-A' },
  { value: 'price_asc', label: 'Price Low to High' },
  { value: 'price_desc', label: 'Price High to Low' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
] as const;

export const PRICE_RANGES = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: Infinity, label: 'Over $200' }
] as const;

export const RATING_FILTERS = [
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' }
] as const;

export const PAGINATION_LIMITS = {
  PRODUCTS: 12,
  SEARCH_RESULTS: 20,
  RELATED_PRODUCTS: 6
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
} as const;

export const ANIMATION_DURATIONS = {
  SHORT: 200,
  MEDIUM: 300,
  LONG: 500
} as const;

export const STORAGE_KEYS = {
  CART: 'ecommerce_cart',
  FAVORITES: 'ecommerce_favorites',
  USER_PREFERENCES: 'ecommerce_user_preferences',
  THEME: 'ecommerce_theme',
  LANGUAGE: 'ecommerce_language'
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Please check your input and try again.',
  CART_LIMIT: 'Cannot add more items. Cart limit reached.',
  OUT_OF_STOCK: 'This item is currently out of stock.',
  INVALID_QUANTITY: 'Please enter a valid quantity.'
} as const;

export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Item added to cart successfully!',
  REMOVED_FROM_CART: 'Item removed from cart.',
  ADDED_TO_FAVORITES: 'Added to favorites!',
  REMOVED_FROM_FAVORITES: 'Removed from favorites.',
  CART_UPDATED: 'Cart updated successfully.',
  PREFERENCES_SAVED: 'Preferences saved successfully.'
} as const;

export const SUPPORTED_LOCALES = ['en', 'es'] as const;

export const DEFAULT_LOCALE = 'en';

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£'
} as const;

export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  FULL: 'EEEE, MMMM dd, yyyy'
} as const;