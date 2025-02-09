"use client"
import { getAllTotals } from "@/action/info";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  const [totals, setTotals] = useState({
    productsTotal: 0,
    categoriesTotal: 0,
    suppliersTotal: 0,
    usersTotal: 0,
    virCatTotal: 0,
    vpTotal: 0,
    vpOrderTotal: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      const data = await getAllTotals()
      
      if (data) {
        setTotals(data);
      }
    };

    fetchTotals();
  }, []);

  const fields: {
    name: string;
    num: number;
    icon: React.ReactNode;
    path: string;
    totalKey?: keyof typeof totals; // Optional key to map to totals
  }[] = [
    {
      name: "Product",
      num: totals.productsTotal, // Default value, will be updated
      path: "/dashboard/product",
      icon: <FaBoxOpen className="text-4xl text-blue-600" />,
      totalKey: "productsTotal",
    },
    {
      name: "Categories",
      num: totals.categoriesTotal,
      path: "/dashboard/category",
      icon: <MdCategory className="text-4xl text-red-500" />,
      totalKey: "categoriesTotal",
    },
    {
      name: "Supplier",
      num: totals.suppliersTotal,
      path: "/dashboard/supplier",
      icon: <FaTruckLoading className="text-4xl text-yellow-600" />,
      totalKey: "suppliersTotal",
    },
    {
      name: "Stock",
      num: 500,
      path: "/dashboard/inventory",
      icon: <FaCubes className="text-4xl text-teal-600" />,
    },
    {
      name: "Virtual Product",
      num: totals.vpTotal,
      path: "/dashboard/virtualProduct",
      icon: <FaUnity className="text-4xl text-purple-500" />,
      totalKey: "vpTotal",
    },
    {
      name: "Virtual Category",
      num: totals.virCatTotal,
      path: "/dashboard/virtualProduct/category",
      icon: <FaNetworkWired className="text-4xl text-green-500" />,
      totalKey: "virCatTotal",
    },
    {
      name: "Virtual Order",
      num: totals.vpOrderTotal,
      path: "/dashboard/virtualOrder",
      icon: <FaClipboardList className="text-4xl text-green-600" />,
      totalKey: "vpOrderTotal",
    },
    {
      name: "Sub Categories",
      num: 10,
      path: "/dashboard/subCategory",
      icon: <MdCategory className="text-4xl text-amber-500" />,
    },
  ];

  return (
    <div className="admin-dashboard ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {fields.map((item, index) => (
          <Link href={item.path} key={index} passHref>
            <div className="group px-6 py-6 shadow-md rounded-xl dark:bg-gray-800 bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out flex items-center space-x-4 h-full">
              <div className="w-3/4 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-blue-500">
                  {item.name}
                </h3>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  {item.totalKey ? totals[item.totalKey] : item.num}
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