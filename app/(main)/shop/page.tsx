import ShopComponent from "@/app/components/shop1/ShopComponent";
import VirtualShop from "@/components/shop/VirtualShop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop() {
  return (
    <div className="container mx-auto py-6">
      <ShopComponent />
    </div>
  );
}
