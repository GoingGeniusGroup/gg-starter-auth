export interface Product {
  id: number;
  name: string;
  price: number;
  type?: string;
  images: string[];
  category: string;
  description: string;
  src?: string;
  animation?: string;
}

export interface CartItem extends Product {
  quantity: number;
  productType: string;
}
