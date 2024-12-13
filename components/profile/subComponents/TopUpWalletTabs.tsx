"use client";

import { useState } from "react";
import Image from "next/image";

export default function TopUpWalletTabs() {
  const [activeTab, setActiveTab] = useState("redeem");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Sample topup methods data
  const topupMethods = [
    {
      id: 1,
      image: "/icons/share.png",
      amount: "$99.99",
      description: "Premium",
    },
    {
      id: 2,
      image: "/icons/share.png",
      amount: "$49.99",
      description: "PAA",
    },
    {
      id: 3,
      image: "/icons/share.png",
      amount: "$19.99",
      description: "NNN",
    },
    {
      id: 4,
      image: "/icons/share.png",
      amount: "$9.99",
      description: "AFK",
    },
    {
      id: 5,
      image: "/icons/share.png",
      amount: "$4.99",
      description: "AFM",
    },
  ];

  return (
    <div className="size-full">
      <div className="flex w-full items-center justify-center">
        <ul className="flex w-full justify-center space-x-2 overflow-auto">
          <li className="w-full">
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === "redeem"
                  ? "bg-gray-300 text-black dark:bg-white dark:font-semibold dark:text-black"
                  : "bg-white/40 text-black hover:bg-white/70"
              }`}
              onClick={() => handleTabClick("redeem")}
            >
              REDEEM
            </div>
          </li>
          <li className="w-full">
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === "topup"
                  ? "bg-gray-300 text-black dark:bg-white dark:font-semibold dark:text-black"
                  : "bg-white/40 text-black hover:bg-white/70"
              }`}
              onClick={() => handleTabClick("topup")}
            >
              TOPUP
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-2 h-[226px] overflow-auto">
        {activeTab && (
          <div className="flex w-full flex-col p-4">
            <input type="redeem" />
          </div>
        )}
        {activeTab === "topup" && (
          <div>
            <div className="-mt-2 grid grid-cols-2 gap-4">
              {topupMethods.map((product) => (
                <div
                  key={product.id}
                  className="relative overflow-hidden rounded-md bg-white/50 shadow-md"
                >
                  <div className="h-24 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      unoptimized
                      alt="buy"
                      width={200}
                      height={100}
                      layout="responsive"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-10 w-full bg-white p-1">
                    <h1 className="font-medium text-black ">
                      {product.amount}
                    </h1>
                    <h2 className="absolute bottom-1 right-1 text-xs font-semibold uppercase text-black">
                      {product.description}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
