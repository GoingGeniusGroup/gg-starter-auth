import React from "react";
import bell from "@/public/assets/Bell.svg";
import Image from "next/image";
import { User, Users, Check } from "lucide-react";

const banner = [
  {
    name: "Active Users",
    icon: <User className="w-10 h-10 text-indigo-700" />,
    number: "2M+",
  },
  {
    name: "Delivered Solutions",
    icon: <Check className="w-10 h-10 text-indigo-700" />,
    number: "2.200+",
  },
  {
    name: "Our Members",
    icon: <Users className="w-10 h-10 text-indigo-700" />,
    number: "100+",
  },
];

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      <div className="lg:w-2/3">
        <h2 className="text-4xl font-semibold pb-6 gradient-title">
          Innovative Solutions, Diverse Success Across Industries.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Our tailored excellence has left a lasting impact on clients across
          diverse sectors. Our commitment to innovation and client satisfaction
          fuels our
        </p>

        <div className="md:flex items-center justify-start gap-8">
          {banner.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-4">
              {item.icon}
              <div>
                <h2 className="text-gray-600 dark:text-gray-300 text-2xl font-semibold">
                  {item.number}
                </h2>
                <p className="text-sm">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/3">
        <Image
          src={"/assets/bell.png"}
          alt="dashboard"
          width={500}
          height={500}
          objectFit="cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default Banner;
