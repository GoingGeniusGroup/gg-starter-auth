import React from "react";
import {
  Pencil,
  Share2,
  DollarSign,
  ShoppingCart,
  Users,
  MapPin,
} from "lucide-react";
import Image from "next/image";
export default function ProfileCard() {
  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-white/35 bg-white/10 backdrop-blur-md backdrop-filter">
        <div className="p-6 space-y-6">
          {/* Profile section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
                <Image
                  src="/assets/userAvatar.svg"
                  alt="Profile"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl block  font-bold text-gray-800">
                  Jennie Shrestha
                </h2>
                <p className="text-gray-400">jennie@gmail.com</p>
                <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold text-blue-400 bg-blue-400/20 rounded-full">
                  Manager
                </span>
              </div>
            </div>
             
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-black transition-colors">
                <Pencil className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-black transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <DollarSign className="w-6 h-6 mx-auto text-yellow-400" />
              <p className="mt-1 text-2xl font-bold text-gray-600">10K</p>
              <p className="text-xs text-gray-400">Total Sales</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="w-6 h-6 mx-auto text-green-400" />
              <p className="mt-1 text-2xl font-bold text-gray-600">10</p>
              <p className="text-xs text-gray-400">Avg. Order Value</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto text-purple-400" />
              <p className="mt-1 text-2xl font-bold text-gray-600">10</p>
              <p className="text-xs text-gray-400">Total Employee</p>
            </div>
          </div>

          {/* Footer section */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Kathmandu, Nepal
            </div>
            <div className="space-y-1">
              <p>Join Date: 2021-11-20</p>
              <p>Last Login: 2024-11-20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
