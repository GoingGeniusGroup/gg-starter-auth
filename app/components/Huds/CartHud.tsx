import { ShoppingCart } from "lucide-react";
import { BiMobileVibration } from "react-icons/bi";

export default function CartHud() {
  return (
    <div className="fixed top-[16px] right-[16px] z-50 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-white px-[4px] shadow-md shadow-black/50">
      <div className="bg-gray-300 p-1 rounded-full">
        <ShoppingCart className="size-[17px] text-black" />
      </div>
      <div className="bg-gray-300 p-1 rounded-full">
        <BiMobileVibration className="size-[17px] text-black" />
      </div>
    </div>
  );
}
