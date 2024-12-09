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

const data = {
  Name: "Aayush Karki",
  College: "Itahari International College",
  Subject: "BSc (Hons) Computing",
};

const StudentCardBack = () => {
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

        {/*bottom decoration*/}
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
          <div className="h-2/3 flex flex-col items-center space-y-2">
            <h3 className="text-[14px] font-bold text-center">
              Student Membership ID
            </h3>
            <div className="border border-solid border-black w-[180px] h-[180px] rounded-full">
              <Image
                className="rounded-full"
                src="/card/dummy_Avatar.jpg"
                alt="avatar"
                width={180}
                height={180}
              />
            </div>
            <span className="font-semibold text-[14px]">{data.College}</span>
            <p className="border border-b-black w-full"></p>
          </div>

          <div className="h-1/3 flex w-full">
            <div className="flex flex-col items-start justify-center px-4 py-6">
              <Image src={GGIcon} alt="Logo" width={47} height={47} />
              <CardHeader className="flex flex-col space-y-0 p-0">
                <CardTitle className="font-bold text-[14px]">
                  {data.Name}
                </CardTitle>
                <CardDescription className="font-normal text-[11px]">
                  {data.Subject}
                </CardDescription>
              </CardHeader>
            </div>
            <div className="flex-1 m-auto">
              <Image
                src="/card/QR-Image.jpg"
                alt="qrcode"
                width={85}
                height={85}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentCardBack;
