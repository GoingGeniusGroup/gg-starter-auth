export interface PhysicalProduct {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    description: string;
  }
  
  export interface CartItem extends PhysicalProduct {
    quantity: number;
  }