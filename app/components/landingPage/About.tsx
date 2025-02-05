import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      <div className="lg:w-1/2">
        <Image
          src={"/assets/shop.png"}
          alt="dashboard"
          width={500}
          height={500}
        />
      </div>
      <div className="lg:w-1/2">right</div>
    </div>
  );
};

export default About;
