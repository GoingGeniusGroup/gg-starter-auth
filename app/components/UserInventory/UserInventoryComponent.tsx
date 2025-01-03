import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getInventory } from "@/app/actions/userInventory";
import { useState, useEffect } from "react";

interface InventoryItem {
  VirtualProduct: any;
  id: number;
  name: string;
  description: string;
  quantity: number;
}

function InventoryCard({
  item,
  handleClick,
  isEquipped,
}: {
  item: InventoryItem;
  handleClick: (id: number) => void;
  isEquipped: boolean;
}) {
  return (
    <Card className="w-full">
      <div className="flex items-start p-4">
        <div className="relative w-20 h-20 mr-4 flex-shrink-0">
          <Image
            src={item.VirtualProduct.images[0]}
            alt="Game coin"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        <div className="flex-grow">
          <CardTitle className="text-md">{item.VirtualProduct.name}</CardTitle>
          <p className="text-xs text-gray-600 mt-1">
            {item.VirtualProduct.description}
          </p>
          <p className="mt-2 font-semibold text-sm">
            Quantity: {item.quantity}
          </p>
          <Button
            className="mt-2 w-full sm:w-auto"
            onClick={() => handleClick(item.id)}
          >
            {isEquipped ? "Unequip" : "Equip"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function UserInventoryComponent() {
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [equippedItems, setEquippedItems] = useState<number[]>([]);

  const handleClick = (id: number) => {
    setEquippedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Fetch inventory data
  useEffect(() => {
    const fetchInventory = async () => {
      const data = await getInventory();
      if (data) {
        setInventoryItems(data);
      }
    };
    fetchInventory();
  }, []);

  console.log(inventoryItems);

  return (
    <div className="h-full p-4 overflow-auto bg-white pt-6">
      <h1 className="font-semibold text-2xl mb-6">User Inventory</h1>
      {inventoryItems.length === 0 ? (
        <p className="text-center text-gray-600">No items in the inventory.</p>
      ) : (
        <div className="flex flex-col space-y-4 max-w-md mx-auto">
          {inventoryItems.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              handleClick={handleClick}
              isEquipped={equippedItems.includes(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
