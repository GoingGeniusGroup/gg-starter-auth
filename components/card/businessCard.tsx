"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BusinessCardFront from "./businessCardFront";
import BusinessCardBack from "./businessCardBack";
import "../../styles/globals.css";

const BusinessCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-[336px] h-[192px]"
        onClick={handleCardClick}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="w-full h-full shadow-md"
          transition={{ duration: 0.7 }}
          animate={{ rotateY: flipped ? 180 : 0 }}
        >
          <motion.div
            className="absolute backface-hidden"
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flipped ? 180 : 0 }}
          >
            <BusinessCardFront />
          </motion.div>
          <motion.div
            className="absolute backface-hidden"
            initial={{ rotateY: 180 }}
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flipped ? 0 : 180 }}
          >
            <BusinessCardBack />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BusinessCard;
