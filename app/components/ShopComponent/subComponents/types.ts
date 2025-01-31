export interface VirtualCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  categoryName: string;
  categoryDescription: string | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

export interface VirtualProduct {
  id: string;
  name: string;
  price: number;
  type: string; 
  images: string[];
  rating: number;
  categoryId: string;
  description: string;
  src: string | null;
  animation: string | null;
  stockQuantity: number;
}

export interface CartItem  {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  productType: string;
}