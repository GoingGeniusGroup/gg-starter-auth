export interface VirtualProduct {
  id: number;
  name: string;
  price: number;
  type: string;
  images: string[];
  category: string;
  description: string;
  subCategory?: string[];
  src?: string;
  animation?: string;
}
