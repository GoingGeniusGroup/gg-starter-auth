"use client";
import {
  FaBell,
  FaBriefcase,
  FaStore,
  FaUserCircle,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoDiamondSharp } from "react-icons/io5";
// import {   IoCart } from "react-icons/io5";
// import { FaCreditCard } from "react-icons/fa6";
// import { HiMiniWallet } from "react-icons/hi2";
import Link from "next/link";
import { MdOutlineDarkMode } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";
import { VscClearAll } from "react-icons/vsc";
import ShopComponent from "./subComponents/ShopComponent";
import SideProfile from "./subComponents/ProfileComponent";
import WalletComponent from "./subComponents/WalletComponent";
import EmergencyComponent from "./subComponents/EmergencyComponent";
import SidebarSearchComponent from "./subComponents/SidebarSearchComponent";

const tabs: string[] = [
  "Profile",
  "Wallet",
  "Shop",
  "Emergency",
  "Notifications",
];

type Tab = (typeof tabs)[number];

export default function UserProfileHud() {
  const pathname = usePathname();
  const [selectedTabs, setSelectedTabs] = useState<Tab[]>([]);
  const [removingTab, setRemovingTab] = useState<Tab | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);
  const firstTabRef = useRef<HTMLDivElement | null>(null);

  const closeAllTabs = () => {
    setSelectedTabs([]);
  };

  const handleTabClick = (tab: Tab) => {
    setSelectedTabs((prevTabs) => {
      if (prevTabs.includes(tab)) {
        setRemovingTab(tab);
        setTimeout(() => setRemovingTab(null), 500);
        return prevTabs.filter((t) => t !== tab);
      } else {
        if (prevTabs.length >= 4) {
          return [tab, ...prevTabs.slice(0, 3)];
        } else {
          return [tab, ...prevTabs];
        }
      }
    });
  };

  const renderMobileViewContent = (tab: Tab): JSX.Element | null => {
    switch (tab) {
      case "Profile":
        return <SideProfile />;
      case "Wallet":
        return <WalletComponent />;
      case "Shop":
        return <ShopComponent />;
      case "Emergency":
        return <EmergencyComponent />;
      case "Notifications":
        return <SidebarSearchComponent />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedTabs.length > 0 && firstTabRef.current) {
      firstTabRef.current.focus();
    }
  }, [selectedTabs]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedTabs.length > 0) {
      timer = setTimeout(() => {
        setShowClearAll(true);
      }, 300);
    } else {
      setShowClearAll(false);
    }
    return () => clearTimeout(timer);
  }, [selectedTabs]);

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
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      {pathname !== "/" && (
        <motion.div className="fixed bottom-[20px] right-[32px] z-50 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-gray-200 py-[6px] pl-[0px] pr-[50px] shadow-lg shadow-black/50">
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
                selectedTabs.includes(tab) ? "bg-blue-100" : "bg-white"
              }`}
            >
              {getIcon(tab)}
            </div>
          ))}
          <AnimatePresence>
            {showClearAll && selectedTabs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                className="group absolute bottom-0.5 right-3 flex size-[26px] items-center justify-center rounded-full bg-white font-semibold text-black shadow-black drop-shadow-lg hover:bg-blue-100"
                onClick={closeAllTabs}
              >
                <VscClearAll size={17} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {selectedTabs.length > 0 && <div className="fixed inset-0 z-30 "></div>}

      <div className="fixed right-[76px] top-1/2 z-40 flex h-[600px] -translate-y-1/2">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {selectedTabs.map((tab, index) => (
              <motion.div
                key={tab}
                ref={index === 0 ? firstTabRef : null}
                tabIndex={0}
                layout
                className="relative ml-4 h-full w-[306px] overflow-hidden rounded-md bg-custom-gradient-purple p-2 text-black shadow-lg shadow-black/50 backdrop-blur-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: removingTab === tab ? -300 : 300,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                }}
              >
                <motion.button
                  className="absolute right-1 top-1 z-40 rounded-full bg-gray-200 p-1"
                  onClick={() => handleTabClick(tab)}
                  whileHover={{ rotate: 180, backgroundColor: "#d1d5db" }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes size={14} />
                </motion.button>

                <div className="size-full">{renderMobileViewContent(tab)}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
}
