import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

import GGIcon from "../../public/card/GGReal Icon.svg";
import { title } from "process";

const data = {
  description:
    "This is a Digital ID Issued by the Going Genius Education Membership.",
  bydetails: [
    {
      id: 1,
      title: "Softwarica | Going Genius Group",
    },
    {
      id: 2,
      title: "Going Genius Education Membership",
    },
    {
      id: 3,
      title: "goinggenius.com.np | Going Genius Group",
    },
  ],
  details: [
    {
      id: 1,
      title: "ID Number",
      desc: "9827368746",
    },
    {
      id: 2,
      title: "Expiration",
      desc: "DD/MM/YYYY",
    },
    {
      id: 3,
      title: "Student Name",
      desc: "Aayush Karki",
    },
    {
      id: 4,
      title: "Emergency Contact",
      Name: "Rabindra Lama",
      desc: "9803020439",
    },
    {
      id: 5,
      title: "Course Name",
      desc: "BSc (Hons) Computing",
    },
  ],
};

const StudentCardBack = () => {
  const filteredRowDetails = data.details.filter((d) =>
    ["ID Number", "Expiration"].includes(d.title)
  );

  const filteredColDetails = data.details.filter((d) =>
    ["Student Name", "Emergency Contact", "Course Name"].includes(d.title)
  );

  return (
    <Card className="w-[266px] h-[413px] bg-white border-none relative overflow-hidden">
      <div className="relative h-full">
        {/* top decoration */}
        <svg
          className="absolute top-0"
          width="266"
          height="20"
          viewBox="0 0 266 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="28.6865" width="209.931" height="10" fill="black" />
          <path d="M0 0H39.1176L26.0784 20H0V0Z" fill="#FFDD55" />
          <path d="M226.883 0H266V20H239.922L226.883 0Z" fill="#FFDD55" />
          <path d="M26.0781 20L32.5977 10H45.6369L26.0781 20Z" fill="#FFDD55" />
          <path d="M239.921 20L233.402 10H220.362L239.921 20Z" fill="#FFDD55" />
        </svg>

        {/* bottom decoration */}
        <svg
          className="absolute bottom-0"
          width="266"
          height="28"
          viewBox="0 0 266 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="28.6865" y="14" width="208.627" height="14" fill="black" />
          <path d="M0 0H26.0784L39.1176 28H0V0Z" fill="#FFDD55" />
          <path d="M239.921 0H265.999V28H226.882L239.921 0Z" fill="#FFDD55" />
        </svg>

        <div className="absolute flex flex-col justify-between inset-0 py-4">
          {/* Content */}
          <div className="h-2/3 flex flex-col">
            <div className="mx-auto mb-4">
              <Image src={GGIcon} alt="Logo" width={47} height={47} />
            </div>
            {/* Filtered Row Details */}
            <div className="flex items-start w-full">
              {filteredRowDetails.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col px-4 w-full gap-0 mb-2"
                >
                  <span className="font-medium text-[10px] leading-tight">
                    {d.title}
                  </span>
                  <p className="font-bold text-[15px] leading-tight">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
            {/* Filtered Column Details */}
            <div className="flex flex-col items-start w-full">
              {filteredColDetails.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col px-4 w-full gap-0 mb-2"
                >
                  <span className="font-medium text-[10px] leading-tight">
                    {d.title}
                  </span>
                  <p className="font-bold text-[15px] leading-tight">
                    {d.desc}
                  </p>
                  <p className="font-bold text-[15px] leading-tight">
                    {d.Name}
                  </p>
                </div>
              ))}
            </div>
            <p className="p-[1px] bg-black rounded-xl mx-2 z-50 my-2"></p>
          </div>

          {/*Bottom Content*/}
          <div className="h-1/3 flex flex-col w-full mt-2">
            <h2 className="font-bold text-[10px] text-center mb-6">
              {data.description}
            </h2>
            {data.bydetails.map((d) => (
              <div key={d.id} className="font-medium text-[10px] text-center">
                {d.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentCardBack;
