import React from 'react'
interface SupplierFormProps {
  onCancel: () => void;
}
const SupplierForm = ({ onCancel }: SupplierFormProps) => {
  return (
    <div className='flex justify-center items-center'>
        <form  className='w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6 '>
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
            <legend className="text-xl font-semibold text-blue-500 px-2">
                Supplier
            </legend>
            <div className='grid grid-cols-1 gap-3'></div>
            <div className="mb-3">
              <label htmlFor="supplierName" className="block text-sm font-semibold text-gray-700">Name:</label>
              <input
                type="text"
                id="supplierName"
                name="supplierName"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="supplierPhone" className="block text-sm font-semibold text-gray-700">Phone:</label>
              <input
                type="text"
                id="supplierPhone"
                name="supplierPhone"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="supplierEmail" className="block text-sm font-semibold text-gray-700">Email:</label>
              <input
                type="text"
                id="supplierEmail"
                name="supplierEmail"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="supplierAddress" className="block text-sm font-semibold text-gray-700">Address:</label>
              <input
                type="text"
                id="supplierAddress"
                name="supplierAddress"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="suppliedProduct" className="block text-sm font-semibold text-gray-700">Product:</label>
              <input
                type="text"
                id="suppliedProduct"
                name="suppliedProduct"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
  <button
    type="submit"
    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    Submit
  </button>
  <button
    type="button"
    onClick={onCancel}
    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
  >
    Cancel
  </button>
</div>

        
            </fieldset>
        </form>

    </div>
  )
}

export default SupplierForm