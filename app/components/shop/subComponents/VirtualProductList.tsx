import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./types";

interface ProductListProps {
  products: Product[];
  cart: Record<string, number>;
  onAddToCart: (productId: number, productType: string) => void;
  onSelectProduct?: (product: Product) => void;
  wishlist: number[]; // Wishlist state passed from the parent
  onToggleWishlist: (productId: number) => void;
}

const VirtualProductList: React.FC<ProductListProps> = ({
  products,
  cart,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
}) => {
  
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      gap-2 sm:gap-4`}
    >
      {(products || []).map((product) => (
        <ProductCard
          isMobile={false}
          key={product.id}
          product={product}
          cartQuantity={cart[`virtual-${product.id}`] || 0}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlist.includes(product.id)}
          productType="virtual"
        />
      ))}
    </div>
  );
};

export default VirtualProductList;
