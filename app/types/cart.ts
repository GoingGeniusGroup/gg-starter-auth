export interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  productType: string;
  quantity: number;
}

export interface Category {
  id: string;
  categoryName: string;
  categoryDescription: string | null;
}

export interface VirtualCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  rating?: number;
  stockQuantity?: number;
}

export interface VirtualProduct extends Product {
  type: string;
  animation?: string;
  src?: string;
  categoryId: string;
}
