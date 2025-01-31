import ProdDetailPage from '@/components/productComp/ProdDetailPage';
import React from 'react'
interface prodProps {
    params: {
      id: string;
    };
  }
const ProductViewPage: React.FC<prodProps>= ({params}) => {
    const {id}=params
  return (
    <div>
      <ProdDetailPage productId={id}/>
    </div>
  )
}

export default ProductViewPage