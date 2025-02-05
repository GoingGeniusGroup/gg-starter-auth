import React from "react";

const Service = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
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
      </div>
      <div className="lg:w-1/2"></div>
    </div>
  );
};

export default Service;
