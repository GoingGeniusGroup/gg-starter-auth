"use client";
import {
  FaBell,
  FaBriefcase,
  FaStore,
  FaUserCircle,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { IoDiamondSharp } from "react-icons/io5";
// import {   IoCart } from "react-icons/io5";
// import { FaCreditCard } from "react-icons/fa6";
// import { HiMiniWallet } from "react-icons/hi2";
import Link from "next/link";
import { MdOutlineDarkMode } from "react-icons/md";
import { GiCash } from "react-icons/gi";

const tabs = ["Profile", "Wallet", "Shop", "Emergency", "Notifications"];

export default function UserProfileHud() {
  const [selectedTab, setSelectedTab] = useState("Cart");

  const handleTabClick = (tab: string) => {
    if (tab === selectedTab) {
      // If the tab is already selected minimize the view
      setSelectedTab("");
    } else {
      setSelectedTab(tab);
    }
  };

  const getIcon = (tab: string) => {
    switch (tab) {
      // case "Cart":
      //   return <IoCart className="text-blue-500" size={17} />;
      // case "Edit":
      //   return <FaCreditCard className="text-blue-500" size={17} />;
      // case "Wallet":
      //   return <HiMiniWallet className="text-blue-500" size={17} />;
      // default:
      //   return null;
      case "Profile":
        return <FaUserCircle className="text-black" size={17} />;
      case "Wallet":
        return <FaBriefcase className="text-black" size={17} />;
      case "Shop":
        return <FaStore className="text-black" size={17} />;
      case "Emergency":
        return <FaUsers className="text-black" size={17} />;
      case "Notifications":
        return <FaBell className="text-black" size={17} />;
      default:
        return null;
    }
  };

  // Theme changer
  const [theme, setTheme] = useState("light");

  // handle theme change
  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="fixed bottom-[20px] right-[32px] z-50 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-gray-200 py-[6px] pl-[0px] pr-[50px] shadow-lg shadow-black/50">
      <Link
        href={`#`}
        className="absolute -right-3 -top-9 size-[62px] overflow-hidden rounded-full border-2 bg-black/60"
      >
        <Image
          src="/assets/userAvatar.svg"
          alt="profile pic"
          fill={true}
          unoptimized
          className="select-none object-cover transition-transform duration-300 ease-in-out hover:scale-125"
        />
      </Link>

      {/* Top */}
      <div className="absolute -top-6 flex h-[20px] w-[78%] select-none justify-between">
        <div className="flex gap-x-1 text-xs">
          <div className="flex size-[19px] items-center justify-center rounded-full border-2 border-green-600 text-green-800">
            <GiCash />
          </div>
          <p
            style={{
              color: "#ffffff",
              textShadow: "1px 1px 2px #4da352",
            }}
          >
            13,789
          </p>
        </div>
        <div className="flex gap-x-1 text-xs">
          <div className="flex size-[19px] items-center justify-center  rounded-full border-2 border-yellow-500 text-yellow-500">
            <IoDiamondSharp />
          </div>
          <p
            style={{
              color: "#ffffff",
              textShadow: "1px 1px 2px #dbb30f",
            }}
          >
            97,869
          </p>
        </div>

        <div
          className={`size-[19px] rounded-full border-2  ${
            theme === "light"
              ? "border-white bg-black text-white"
              : "border-black bg-white text-black"
          } transition-all duration-300 ease-in-out`}
          onClick={handleThemeChange}
        >
          <MdOutlineDarkMode />
        </div>
      </div>

      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => handleTabClick(tab)}
          className={`flex size-[26px] items-center justify-center rounded-full shadow-black drop-shadow-lg hover:bg-blue-100 ${
            selectedTab === tab ? "bg-blue-100" : "bg-white"
          }`}
        >
          {getIcon(tab)}
        </div>
      ))}
    </div>
  );
}
