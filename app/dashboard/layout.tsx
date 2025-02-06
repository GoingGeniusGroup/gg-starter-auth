"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/_components/dashboard/Sidebar";
import Topbar from "@/_components/dashboard/Topbar";
import { ReactNode, useState } from "react";

const DashboardLayout = ({ children,orderStat }: { children: ReactNode,orderStat:ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen relative py-4">
      {/* Topbar */}
      <Topbar isCollapsed={isCollapsed} />

      <div className="flex flex-grow  ">
        {" "}
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} onToggle={setIsCollapsed} />
        {/* Main Content */}
        <main
          className="flex-grow overflow-auto transition-all duration-300"
          style={{
            marginLeft: isCollapsed ? "7rem" : "16rem",
          }}
        > 
          {children}
          {pathname === "/dashboard" && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>{orderStat}</div>
        
        </div>
      )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
