import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./types";

interface ProductListProps {
  products: Product[];
  cart: Record<string, number>;
  onAddToCart: (productId: number, productType: string) => void;
  onSelectProduct?: (product: Product) => void;
}

const VirtualProductList: React.FC<ProductListProps> = ({
  products,
  cart,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
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
          productType="virtual"
        />
      ))}
    </div>
  );
};

export default VirtualProductList;
