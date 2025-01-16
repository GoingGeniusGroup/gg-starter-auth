"use client"
import ProductTable from '@/components/inventoryComponent/ProductTable'
import React,{useState,useEffect} from 'react'
import { getAllproducts } from '@/action/product'
const Product = () => {
  const[products,setProducts]=useState<any[]>([])
  useEffect(()=>{
    async function fetchProducts(){
      try{
        const response=await getAllproducts()
        if (response.success && response.data) {
          setProducts(response.data);

        } else {
          console.error("Failed to fetch products");
        }
      }
      catch(error){
        console.error("failed to fetch products")
      }
    }
    fetchProducts()
  },[])
  return (
    <div className=' '>
  
    {/* <header className="bg-gray-800 text-white p-4 shadow-md">
      <h2 className="text-3xl font-semibold text-center">Inventory Product</h2>
    </header> */}
    <main className='flex-1 p-2 mt-2'>
    <section className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow dark:text-gray-800  dark:bg-gray-300">Total Products: {products.length}</div>
            {/* <div className="bg-white p-4 rounded shadow">Total quantity: 400</div>
            <div className="bg-white p-4 rounded shadow">Low Stock Alerts: 5</div>
            <div className="bg-white p-4 rounded shadow">Total Value: $10,000</div> */}
          </section>
    </main>

    <div>
      <ProductTable />
    </div>
  
  </div>
  
  )
}

export default Product
