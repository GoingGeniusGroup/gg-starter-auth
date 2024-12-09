import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import Blackbg from "../../public/card/businesscard front blackbg.svg";

const BusinessCardFront = () => {
  return (
    // <div className="grid grid-cols-2 w-[336px] h-[192px] bg-white rounded-md">
    //   <div>h</div>
    //   <div>hi</div>
    // </div>
    <Card className="grid grid-cols-2 w-[336px] h-[192px] bg-white overflow-hidden relative">
      <div className="flex flex-col space-y-10">
        <CardHeader className="flex flex-col space-y-0">
          <CardTitle className="text-[14px]">Aayush Karki</CardTitle>
          <CardDescription className="text-[8px]">WebDeveloper</CardDescription>
        </CardHeader>
        <CardContent className="text-[8px]">
          <p>+977 9827368746</p>
          <p>+977 9827368746</p>
          <p>+977 9827368746</p>
        </CardContent>
      </div>
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
      </div>
    </Card>
  );
};

export default BusinessCardFront;
