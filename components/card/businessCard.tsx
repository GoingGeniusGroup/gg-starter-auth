"use client";

import { useState } from "react";
import BusinessCardFront from "./businessCardFront";
import BusinessCardBack from "./businessCardBack";

const BusinessCard = () => {
    const [fliped, setFliped] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
      <BusinessCardFront />
      <BusinessCardBack />
    </div>
  );
};

export default BusinessCard;
