import React from 'react'

const CategoryForm = () => {
  return (
    <div className='flex justify-center items-center'>
    <form  className='w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6 '>
    <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
        <legend className="text-xl font-semibold text-blue-500 px-2">
            Categories
        </legend>
        <div className='grid grid-cols-1 gap-3'></div>
        <div className="mb-3">
          <label htmlFor="categoryType" className="block text-sm font-semibold text-gray-700">Categories Type:</label>
          <input
            type="text"
            id="categoryType"
            name="categoryType"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-3">
            <label htmlFor="categoryImage" className="block text-sm font-semibold text-gray-700">
              Category Image:
            </label>
            <input
              type="file"
              id="categoryImage"
              name="categoryImage"
              accept="image/*"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        <button
          type="submit"
          className="w-full p-2 my-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
        </fieldset>
    </form>

</div>
    
  )
}

export default CategoryForm