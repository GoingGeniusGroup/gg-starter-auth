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
  FaDigitalOcean,
  FaCloud,
  FaCube,
  FaUnity,
  FaUserCircle,
  FaNetworkWired,
} from "react-icons/fa";

import { MdCategory, MdOutlineStorefront, MdInventory } from "react-icons/md";

const InventoryManagement: React.FC = () => {
  const fields: {
    name: string;
    num: number;
    icon: React.ReactNode;
    path: string;
  }[] = [
    {
      name: "Product",
      num: 10,
      path: "/dashboard/product",
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
      path: "/dashboard/category",
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
      path: "/dashboard/supplier",
      icon: <FaTruckLoading className="text-4xl text-yellow-600" />,
    },
    {
      name: "Stock",
      num: 500,
      path: "/dashboard/inventory",
      icon: <FaCubes className="text-4xl text-teal-600" />,
    },
    // {
    //   name: "Warehouse",
    //   num: 5,
    //   path:"/dashboard",
    //   icon: <FaWarehouse className="text-4xl text-purple-600" />,
    // },
    {
      name: "Virtual Product",
      num: 10,
      path: "/dashboard/virtualProduct",
      icon: <FaUnity className="text-4xl text-purple-500" />,
    },
    {
      name: " Virtual Category",
      num: 10,
      path: "/dashboard/virtualProduct/category",
      icon: <FaNetworkWired className="text-4xl text-green-500" />,
    },
    {
      name: " Virtual Order",
      num: 20,
      path: "/dashboard/virtualOrder",
      icon: <FaClipboardList className="text-4xl text-green-600" />,
    },
    {
      name: " Sub Categories",
      num: 10,
      path: "/dashboard/subCategory",
      icon: <MdCategory className="text-4xl text-amber-500" />,
    },

    // {
    //   name: "Low Stock",
    //   num: 20,
    //   icon: <FaExclamationTriangle className="text-4xl text-red-600" />,
    // },
  ];

  return (
    <div className="admin-dashboard ">
      {/* <header className="bg-gray-200 text-black p-6 shadow-md">
        <h2 className="text-3xl font-semibold text-center">Inventory Management</h2>
      </header> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {fields.map((item, index) => (
          <Link href={item.path} key={index} passHref>
            <div className="group px-6 py-6 shadow-md rounded-xl dark:bg-gray-800 bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out flex items-center space-x-4 h-full">
            
              <div className="w-3/4 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-blue-500">
                  {item.name}
                </h3>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  {item.num}
                </div>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <div className="text-5xl transition-colors duration-300 group-hover:text-blue-500">
                  {item.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;
