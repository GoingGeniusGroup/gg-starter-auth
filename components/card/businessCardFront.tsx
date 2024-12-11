import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail, CiLocationOn } from "react-icons/ci";
import GGLOGO from "../../public/card/GGLOGO.svg";
import { QRCodeSVG } from "qrcode.react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

interface BusinessCardProps {
  userName: string;
  userField: string;
  phone: string;
  email: string;
  location: string;
}

const BusinessCardFront: React.FC<BusinessCardProps> = ({
  userName,
  userField,
  email,
  phone,
  location,
}) => {
  const data = {
    Company: "Going Genius",
    Name: userName,
    Field: userField,
    Tagline: "Tag line goes here",
    details: [
      {
        id: 1,
        icon: <FaPhoneAlt size={8} />,
        text: phone,
      },
      {
        id: 2,
        icon: <CiMail size={8} />,
        text: email,
      },
      {
        id: 3,
        icon: <CiLocationOn size={8} />,
        text: location,
      },
    ],
  };
  return (
    <Card className="grid grid-cols-2 w-[336px] h-[192px] bg-white overflow-hidden relative border-none">
      {/*left side*/}
      <div className="flex flex-col space-y-8">
        <CardHeader className="flex flex-col space-y-0">
          <CardTitle className="text-[14px]">{data.Name}</CardTitle>
          <CardDescription className="text-[8px]">{data.Field}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.details.map((detail) => (
            <div key={detail.id} className="flex space-x-2">
              <span className="flex items-center justify-center py-[3px] px-[3px] bg-[#2bbe9b] rounded-[2px] text-white">
                {detail.icon}
              </span>
              <p className="text-[8px] font-light">{detail.text}</p>
            </div>
          ))}
        </CardContent>
      </div>

      {/*right side*/}
      <div className="relative">
        {/*Light Green BG*/}
        <svg
          className="absolute w-full h-full z-10 -left-[57px]"
          width="72"
          height="192"
          viewBox="0 0 72 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.5005 78.5C15.9279 55.3334 1.0761 29.6536 0.34375 0H26.2483C30.7184 16.7575 39.1366 40.6042 54.0005 73C74.4512 117.572 73.6776 160.712 67.0559 192H42.3314C55.436 164.7 63.1014 130.327 30.5005 78.5Z"
            fill="#2BBE9B"
          />
        </svg>

        {/*slightly dark Green BG*/}
        <svg
          className="absolute w-full h-full z-20 -left-[52px]"
          width="71"
          height="192"
          viewBox="0 0 71 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.1853 79C15.5309 55.7033 0.594102 29.8651 0.0175781 0H25.8004C30.2357 16.782 38.6729 40.7807 53.6853 73.5C74.0274 117.835 73.37 160.753 66.8458 192H42.2552C55.2128 164.781 62.5875 130.511 30.1853 79Z"
            fill="#287B67"
          />
        </svg>

        {/*Dark BG*/}
        <svg
          className="absolute w-full h-full z-30 left-1"
          width="164"
          height="192"
          viewBox="0 0 164 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M164 0H0.77564C-0.719816 27.4658 8.85106 49.7127 23.185 72.5C55.8398 124.413 45.83 162.309 31.1499 192H164V0Z"
            fill="#141717"
          />
        </svg>

        {/**Logo and Company Name */}
        <div className="absolute top-4 left-6 z-40 flex items-center space-x-2">
          {/**Logo SVG */}
          <Image src={GGLOGO} alt="logo" width={33} height={33} />

          {/**company name and tagline*/}
          <div className="flex flex-col items-start">
            <h3 className=" text-white text-[12px] font-semibold">
              {data.Company}
            </h3>
            <span className="text-gray-200 text-[6px] font-medium">
              {data.Tagline}
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 left-[50%] transform -translate-x-1/5 z-40 py-2">
          <Image
            src="/card/QR-Image.jpg"
            alt="QR Image"
            width={40}
            height={40}
          />
        </div>
      </div>
    </Card>
  );
};

export default BusinessCardFront;
