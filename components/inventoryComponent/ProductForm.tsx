"use client";
import { useState } from "react";
import { PackagePlus, PackageMinus } from 'lucide-react';

const ProductForm= () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>("0.00");

  const calculateTotalPrice = (quantity: number, price: number) => {
    setTotalPrice((quantity * price).toFixed(2));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <form className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
            <legend className="text-xl font-bold text-blue-500 px-2">Product Form</legend>
            <fieldset className=" my-4 border rounded-lg p-4">
          <legend className="text-lg  text-blue-500 px-2">Product Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-semibold text-gray-700">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="productId" className="block text-sm font-semibold text-gray-700">Product ID:</label>
              <input
                type="text"
                id="productId"
                name="productId"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="unit" className="block text-sm font-semibold text-gray-700">Unit:</label>
              <input
                type="text"
                id="unit"
                name="unit"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                required
                value={quantity}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setQuantity(val);
                  calculateTotalPrice(val, price);
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price per Unit:</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setPrice(val);
                  calculateTotalPrice(quantity, val);
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="totalPrice" className="block text-sm font-semibold text-gray-700">Total Price:</label>
              <input
                type="text"
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                readOnly
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="orderType" className="block text-sm font-semibold text-gray-700">Category:</label>
              <select
                id="category"
                name="category"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled >Select Product Category</option>
                <option value="virtual">Virtual</option>
                <option value="physical">Physical</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="productImage" className="block text-sm font-semibold text-gray-700">Image</label>
              <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  accept="image/*"
                  required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-sm font-semibold text-gray-700">
            Product Description:
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              rows={3}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>
        </fieldset>

        
        <button
          type="submit"
          className="w-full p-2 my-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
        </fieldset>
        

      </form>
    </div>
  );
};

export default ProductForm;
