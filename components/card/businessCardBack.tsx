import React from "react";
import GGLOGO from "../../public/card/GGLOGO.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

const data = {
  Company: "Going Genius",
  Tagline: "Tag line goes here",
};

const BusinessCardBack = () => {
  const qrCodeData = "https://ggrelativity.xyz/";
  return (
    <Card className="grid grid-cols-2 w-[336px] h-[192px] bg-black overflow-hidden relative border-none">
      {/*Left Side*/}
      <div className="relative">
        <svg
          className="absolute right-0"
          width="183"
          height="192"
          viewBox="0 0 183 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.0063 1C409.169 86.9414 -0.851111 188.463 1.0063 190.976C2.8637 193.488 1.0063 1 1.0063 1Z"
            fill="#2BBE9B"
            stroke="black"
          />
        </svg>

        <div className="absolute top-[54px] right-[70px]">
          <QRCodeSVG
            className="p-[2px] bg-white"
            value={qrCodeData}
            size={70}
          />
        </div>
      </div>

      {/*Right Side*/}
      <div className="flex flex-col items-center justify-center space-y-2">
        <Image src={GGLOGO} alt="logo" width={33} height={33} />

        <CardHeader className="space-y-0 p-0">
          <CardTitle className="text-white font-semibold text-[16px]">
            {data.Company}
          </CardTitle>
          <CardDescription className="text-gray-200 font-medium text-[8px]">
            {data.Tagline}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default BusinessCardBack;
