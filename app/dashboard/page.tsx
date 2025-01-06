
import Link from "next/link";
import React from "react";

import {
  FaBoxOpen,
  FaClipboardList,
  FaTruckLoading,
  FaWarehouse,
  FaChartLine,
  FaCubes,
  FaExclamationTriangle,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

import { MdCategory, MdOutlineStorefront, MdInventory } from 'react-icons/md';

const InventoryManagement: React.FC = () => {
  
  const fields: { name: string; num: number, icon: React.ReactNode; path:string }[] = [
    {
      name: "Product",
      num: 10,
      path:"/dashboard/product",
      icon: <FaBoxOpen className="text-4xl text-blue-600" />,
    },
    // {
    //   name: "Order",
    //   num: 20,
    //   icon: <FaClipboardList className="text-4xl text-green-600" />,
    // },


    {
      name: "Categories",
      num: 10,
      path:"/dashboard/category",
      icon: <MdCategory className="text-4xl text-red-500" />,
    },
    // {
    //   name: "Sales",
    //   num: 150,
    //   path:"/dashboard",
    //   icon: <FaChartLine className="text-4xl text-orange-600" />,
    // },
    // {
    //   name: "Purchase",
    //   num: 250,
    //   path:"/dashboard",
    //   icon: <FaShoppingCart className="text-4xl text-indigo-600" />,
    // },
    // {
    //   name: "Revenue",
    //   num: 5000, 
    //   path:"/dashboard",
    //   icon: <FaDollarSign className="text-4xl text-green-500" />, 
    // },
    {
      name: "Supplier",
      num: 15,
      path:"/dashboard/supplier",
      icon: <FaTruckLoading className="text-4xl text-yellow-600" />,
    },
    // {
    //   name: "Warehouse",
    //   num: 5,
    //   path:"/dashboard",
    //   icon: <FaWarehouse className="text-4xl text-purple-600" />,
    // },
    {
      name: "Virtual",
      num: 10,
      path:"/dashboard/virtualProduct",
      icon: <FaBoxOpen className="text-4xl text-blue-600" />,
    },
    {
      name: "Stock",
      num: 500,
      path:"/dashboard/inventory",
      icon: <FaCubes className="text-4xl text-teal-600" />,
    },
    
   
    // {
    //   name: "Low Stock",
    //   num: 20,
    //   icon: <FaExclamationTriangle className="text-4xl text-red-600" />,
    // },
  
  ];

 
  return (
    <div className="admin-dashboard bg-gray-100 min-h-screen">
  
      {/* <header className="bg-gray-200 text-black p-6 shadow-md">
        <h2 className="text-3xl font-semibold text-center">Inventory Management</h2>
      </header> */}
  
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {fields.map((item, index) => (
         <Link href={item.path} key={index} passHref>
             <div
    
            className="px-6 py-8 shadow-lg rounded-xl hover:scale-105  ease-in duration-300 bg-white flex"
          >
            
            <div className="w-1/3 flex items-center justify-center">
              <div className="text-4xl">{item.icon}</div>
            </div>
            
            <div className="w-2/3 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
              {/* <div className="text-4xl font-bold text-gray-800">{item.num}</div> */}
            </div>
          </div>
         </Link>
        ))}
      </div>
    </div>
  );
  
};

export default InventoryManagement;


