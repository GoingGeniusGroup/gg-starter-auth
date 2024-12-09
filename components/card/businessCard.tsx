import React from "react";
import BusinessCardFront from "./businessCardFront";
import BusinessCardBack from "./businessCardBack";

const BusinessCard = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BusinessCardBack />
    </div>
  );
};

export default BusinessCard;
