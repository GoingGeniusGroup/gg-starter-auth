import React from "react";
import RightSideHud from "@/components/hud/RightSideHud";

function page() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <RightSideHud />
      </div>
    </div>
  );
}

export default page;
