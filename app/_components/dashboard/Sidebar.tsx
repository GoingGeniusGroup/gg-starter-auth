"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    iconPath: "/assets/dashboardIcon.svg",
    path: "/dashboard",
  },
  {
    name: "Products",
    iconPath: "/assets/productIcon.svg",
    path: "/dashboard/product",
  },
 
  {
    name: "Inventory",
    iconPath: "/assets/inventoryIcon.svg",
    path: "/dashboard/inventory",
  },
  {
    name: "Order",
    iconPath: "/assets/orderIcon.svg",
    path: "/dashboard/order",
  },
  {
    name: "Virtual",
    iconPath: "/assets/productIcon.svg",
    path: "/dashboard/virtualProduct",
  },
  {
    name: "Account",
    iconPath: "/assets/accountIcon.svg",
    path: "/dashboard/account",
  },
  {
    name: "Settings",
    iconPath: "/assets/settingsIcon.svg",
    path: "/dashboard/settings",
  },
];

const Sidebar: React.FC<{
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}> = ({ isCollapsed, onToggle }) => {
  const pathName = usePathname();
  useEffect(() => {
    const handleResize = () => {
      onToggle(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onToggle]);

  return (
    <aside
      className={`bg-white text-gray-900 h-full fixed flex-shrink-0 top-0 z-40 flex flex-col shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-30" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`${
          isCollapsed
            ? "  "
            : "flex items-center px-4 py-4 border-b border-gray-200"
        }  ${isCollapsed ? "justify-center" : ""} transition-all sticky top-0 bg-white z-50`}
      >
        <div
          className={`${
            isCollapsed
              ? "  shadow-md flex flex-col items-center p-3"
              : "w-12 h-12 rounded-full border border-gray-900 shadow-sm bg-gray-200 flex items-center justify-center"
          }`}
        >
          {isCollapsed && (
            <span className="text-sm uppercase font-bold text-gray-700">
              GG Shop
            </span>
          )}
          <Image
            src="/assets/shopIcon.svg"
            alt="GG Shop Logo"
            width={isCollapsed ? 40 : 32}
            height={isCollapsed ? 40 : 32}
          />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold ml-4 text-gray-900">GG SHOP</span>
        )}
      </div>

      {/* Menu Container */}
      <div className="mt-3 flex-grow px-3 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className={`flex ${
                isCollapsed
                  ? "flex-col items-center px-2 py-3"
                  : "flex-row items-center px-4 py-4"
              } ${
                pathName === item.path && "shadow-[#3a3737]"
              } bg-white rounded-lg shadow-lg hover:shadow-[#3a3737] transition mt-2`}
            >
              {isCollapsed && (
                <span className="text-xs font-medium mb-2 text-gray-700">
                  {item.name}
                </span>
              )}
              <Image
                src={item.iconPath}
                alt={`${item.name} Icon`}
                width={18}
                height={18}
              />
              {!isCollapsed && (
                <span className="ml-6 font-medium text-gray-900">
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Collapse Button */}
      <button
        className="p-2 mt-auto text-gray-500 hover:text-gray-900 absolute bottom-5 left-1/2 transform -translate-x-1/2"
        onClick={() => onToggle(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        <span
          className={`transition-transform duration-300 ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        >
          {isCollapsed ? (
            <FiChevronRight size={30} />
          ) : (
            <FiChevronLeft size={30} />
          )}
        </span>
      </button>
    </aside>
  );
};

export default Sidebar;
