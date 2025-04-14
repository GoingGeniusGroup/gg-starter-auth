export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
  categoryId?: string;
  rating?: number;
  stockQuantity?: number;
}

export interface VirtualProduct extends Product {
  type: string;
  animation?: string;
  src?: string;
  categoryId: string;
}
