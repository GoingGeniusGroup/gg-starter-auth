export interface VirtualCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  categoryName: string;
  categoryDescription: string | null;
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

export interface CartItem extends VirtualProduct {
  quantity: number;
  productType: string;
}