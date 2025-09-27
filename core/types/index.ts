  
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  specifications: { [key: string]: string };
  isOnSale: boolean;
  salePercentage?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: boolean;
}

export interface FavoriteItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  parentId?: string;
  isActive: boolean;
}

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  brands: string[];
  rating: number;
  inStock: boolean;
  onSale: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code: string;
}

  export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface SearchBarProps extends BaseComponentProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  loading?: boolean;
}

export interface ProductCardProps extends BaseComponentProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  showQuickView?: boolean;
}

  export interface RootState {
  products: ProductsState;
  cart: CartState;
  favorites: FavoritesState;
  user: UserState;
}

export interface ProductsState {
  items: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  searchQuery: string;
  sortBy: string;
  pagination: PaginationInfo;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  totalAmount: number;
  totalItems: number;
  isOpen: boolean;
}

export interface FavoritesState {
  items: string[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

  export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export type Theme = 'light' | 'dark';

export interface LocaleMessages {
  [key: string]: string | LocaleMessages;
}

export type SupportedLocale = 'en' | 'es';