"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/globals.css";
import StudentCardFront from "./studentCardFront";
import StudentCardBack from "./studentCardBack";

const StudentCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="">
      <motion.div
        className="w-[266px] h-[413px]"
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
            <StudentCardFront />
          </motion.div>
          <motion.div
            className="absolute backface-hidden"
            initial={{ rotateY: 180 }}
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flipped ? 0 : 180 }}
          >
            <StudentCardBack />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentCard;
