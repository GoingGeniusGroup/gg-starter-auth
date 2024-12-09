"use client";
import { useState } from "react";

const InventoryForm= () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>("0.00");
  const [orderType, setOrderType] = useState<string>(""); // Track order type

  const calculateTotalPrice = (quantity: number, price: number) => {
    setTotalPrice((quantity * price).toFixed(2));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <form className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
            <legend className="text-xl font-bold text-blue-500 px-2">Inventory Form</legend>
            <fieldset className=" my-4 border rounded-lg p-4">
          <legend className="text-lg  text-blue-500 px-2">Item Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div className="mb-4">
              <label htmlFor="itemName" className="block text-sm font-semibold text-gray-700">Item Name:</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="itemId" className="block text-sm font-semibold text-gray-700">Item ID:</label>
              <input
                type="text"
                id="itemId"
                name="itemId"
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
          </div>
        </fieldset>

        
        <fieldset className="my-4 border rounded-lg p-4" >
          <legend className="text-lg  text-blue-500 px-2">Order Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="orderId" className="block text-sm font-semibold text-gray-700">Order ID:</label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="orderType" className="block text-sm font-semibold text-gray-700">Order Type:</label>
              <select
                id="orderType"
                name="orderType"
                required
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Order Type</option>
                <option value="Inbound">Inbound (Procurement)</option>
                <option value="Outbound">Outbound (Sales)</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="orderStatus" className="block text-sm font-semibold text-gray-700">Order Status:</label>
              <select
                id="orderStatus"
                name="orderStatus"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Order Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="orderDate" className="block text-sm font-semibold text-gray-700">Order Date:</label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </fieldset>

        {/* Conditional Section for Supplier or Customer Information */}
        {orderType === "Inbound" && (
          <fieldset className=" my-4 border  rounded-lg p-4">
            <legend className="text-lg  text-blue-500 px-2">Supplier Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="supplier" className="block text-sm font-semibold text-gray-700">Supplier Name:</label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="supplierContact" className="block text-sm font-semibold text-gray-700">Supplier Contact:</label>
                <input
                  type="text"
                  id="supplierContact"
                  name="supplierContact"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </fieldset>
        )}

        {orderType === "Outbound" && (
          <fieldset className="border my-4 rounded-lg p-4">
            <legend className="text-lg  text-blue-500 px-2">Customer Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="customerContact" className="block text-sm font-semibold text-gray-700">Customer Contact:</label>
                <input
                  type="text"
                  id="customerContact"
                  name="customerContact"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </fieldset>
        )}
        
         <fieldset className="my-4  border rounded-lg p-4">
          <legend className="text-lg  text-blue-500 px-2">Warehouse Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="warehouse" className="block text-sm font-semibold text-gray-700">Warehouse:</label>
              <input
                type="text"
                id="warehouse"
                name="warehouse"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="warehouseid" className="block text-sm font-semibold text-gray-700">Warehouse ID:</label>
              <input
                type="text"
                id="warehouseid"
                name="warehouseid"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="warehouseLocation" className="block text-sm font-semibold text-gray-700">Warehouse Location:</label>
              <textarea
                id="warehouseLocation"
                name="warehouseLocation"
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

export default InventoryForm;
