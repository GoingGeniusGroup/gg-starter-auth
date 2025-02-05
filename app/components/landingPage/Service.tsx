import React from "react";
import Link from "next/link";
import { ArrowRight, Package, Monitor, CreditCard } from "lucide-react";

const services = [
  {
    name: "Physical Products",
    icon: <Package className="w-10 h-10 text-indigo-700" />,
  },
  {
    name: "Virtual Products",
    icon: <Monitor className="w-10 h-10 text-indigo-700" />,
  },
  {
    name: "Reloadable Cards",
    icon: <CreditCard className="w-10 h-10 text-indigo-700" />,
  },
];

const Service = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      {/*left side*/}
      <div className="lg:w-1/2">
        <h2 className="text-4xl font-semibold pb-6 gradient-title">
          what we provide?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Our POS software offers comprehensive solutions for businesses,
          including seamless management of physical products, virtual products,
          and reloadable cards. Customers can easily top up their cards and make
          direct payments, ensuring fast, secure, and efficient transactions.
        </p>
        <Link href="/">
          <button className="flex items-center px-3 py-4 rounded-lg text-xl text-white bg-indigo-700 hover:bg-indigo-600 mb-8">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      </div>
      {/*right side*/}
      <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800"
          >
            {item.icon}
            <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-200">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
