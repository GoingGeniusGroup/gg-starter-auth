"use client";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { ReactNode, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state

  return (
    <div className="flex flex-col h-screen">
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
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
