import React from 'react'
interface PriceSectionProps {
    salePrice: number;
    costPrice: number;
    discount: number;
    // tax: number;
  }
const ProdPrices: React.FC<PriceSectionProps>  = ({
    salePrice,
    costPrice,
    discount,
    }
  ) => {
    const discountedPrice = salePrice - (salePrice * (discount / 100));
  return (
    <div className='space-y-3'>
        <div className='flex items-center gap-4' >
        <span className="text-3xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    ${salePrice.toFixed(2)}
                  </span>
                )}
                
        </div>
        {discount > 0 && (
                  <span className=" inline-block text-sm mt-1 font-medium bg-yellow-200 rounded-full py-1 px-2 text-yellow-600">
                    Save {discount}%
                  </span>
                )}
           
 </div>
    
  )
}

export default ProdPrices