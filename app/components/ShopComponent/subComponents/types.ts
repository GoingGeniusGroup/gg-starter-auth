export interface VirtualProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  ratings: number;
  ImageUrl: string[];
  category: string;
  sourceFile?: string[];
  animation?: string;
}

  export interface CartItem extends VirtualProduct {
    quantity: number;
    productType: string;
  }