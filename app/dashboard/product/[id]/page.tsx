import React from 'react'
interface prodProps {
    params: {
      id: string;
    };
  }
const ProductViewPage: React.FC<prodProps>= ({params}) => {
    const {id}=params
  return (
    <div>ProductPage</div>
  )
}

export default ProductViewPage