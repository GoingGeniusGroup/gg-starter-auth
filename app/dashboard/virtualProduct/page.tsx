import VirtualTable from '@/components/inventoryComponent/VirtualTable'
import React from 'react'

const VirtualProduct = () => {
  return (
    <div className='bg-gray-100'>
  
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <h2 className="text-3xl font-semibold text-center">Virtual Product</h2>
    </header>
    <main className='flex-1 p-2 mt-2'>
    <section className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow">Total Products: 150</div>
            <div className="bg-white p-4 rounded shadow">Total quantity: 400</div>
            {/* <div className="bg-white p-4 rounded shadow">Low Stock Alerts: 5</div>
            <div className="bg-white p-4 rounded shadow">Total Value: $10,000</div> */}
          </section>
    </main>

    <div>
      <VirtualTable/>
    </div>
  
  </div>
  )
}

export default VirtualProduct