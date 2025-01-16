import VirtualShop from "@/components/shop/VirtualShop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop2() {
  return (
    <div className="flex-1 overflow-hidden size-full">
      <VirtualShop />
    </div>
  );
}
