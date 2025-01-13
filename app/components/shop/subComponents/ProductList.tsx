import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./types";

interface ProductListProps {
  products: Product[];
  cart: Record<string, number>;
  onAddToCart: (productId: number) => void;
  onSelectProduct?: (product: Product) => void;
  isMobile: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  cart,
  onAddToCart,
  onSelectProduct,
  isMobile,
}) => {
  return (
    <div
      className={`grid ${
        isMobile ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      } gap-2 sm:gap-4`}
    >
      {(products || []).map((product) => (
        <ProductCard
          isMobile={isMobile}
          key={product.id}
          product={product}
          cartQuantity={cart[`physical-${product.id}`] || 0}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          productType="physical"
        />
      ))}
    </div>
  );
};

export default ProductList;
