import React from "react";
import { Card } from "../ui/card";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2">
        <Card></Card>
      </div>
      <div className="col-span-1">right</div>
    </div>
  );
};

export default HeroSection;
