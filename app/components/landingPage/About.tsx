import { CircleDollarSign, HardDrive, Truck } from "lucide-react";
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
          objectFit="cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-extrabold pb-6 gradient-title">
          Transform your POS, Next-Level Experience
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Transforming the way you conduct transcations, taking your
          Point-of-Sale system to the next level means more than just an
          upgradecustomer experiences, and unlocking new potentials
        </p>

        <div className="flex flex-col items-start justify-center gap-3">
          <h2 className="flex items-center gap-2">
            <div className="p-3 bg-slate-50 rounded-full">
              <HardDrive className="text-slate-600" />
            </div>
            Hardware and POS System to sell anywhere{" "}
          </h2>
          <h2 className="flex items-center gap-2">
            <div className="p-3 bg-yellow-50 rounded-full">
              <Truck className="text-yellow-600" />
            </div>
            In-Store pickup, online ordering, delivery and shipment{" "}
          </h2>
          <h2 className="flex items-center gap-2">
            <div className="p-3 bg-green-50 rounded-full">
              <CircleDollarSign className="text-green-600" />
            </div>
            secure Payments anywhere your customers are{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
