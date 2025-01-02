"use client";

import { SetStateAction, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { IoCart, IoDiamondSharp } from "react-icons/io5";
import { FaCreditCard, FaMobile } from "react-icons/fa6";
import { HiMiniWallet } from "react-icons/hi2";
import Link from "next/link";
import { MdOutlineDarkMode } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Settings, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { ExtendedUser } from "@/types/next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface ProfileHudProps {
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
  showMobile: boolean;
  handleServerSignOut: () => Promise<void>;
}

const tabs = ["Settings", "Mobile", "Cart", "Edit", "Wallet"] as const;
type TabType = (typeof tabs)[number];

export default function ProfileHud({
  setShowMobile,
  showMobile,
  handleServerSignOut,
}: ProfileHudProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<TabType>("Mobile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Type the user properly
  const user = session?.user as ExtendedUser | undefined;

  // Show component only when authenticated
  useEffect(() => {
    setIsLoggedIn(status === "authenticated");
  }, [status]);

  // Reset selected tab when auth state changes
  useEffect(() => {
    if (status === "unauthenticated") {
      setSelectedTab("Mobile");
    }
  }, [status]);

  const handleTabClick = (tab: TabType) => {
    setSelectedTab((prev) => (prev === tab ? "Mobile" : tab));
  };

  const handleMobileButtonClick = () => {
    setShowMobile((prev) => !prev);
    setSelectedTab("Mobile");
  };

  const logoutAndToggleSidebar = async () => {
    try {
      await handleServerSignOut();
      await signOut({ redirect: false });
      toast.success("You have been logged out.");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // // Don't render if not authenticated
  // if (!isLoggedIn) return null;

  const username = user?.name || "user";
  const profilePic = user?.image;

  return (
    <div className="fixed bottom-[20px] right-[32px] z-50 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-white py-[6px] pl-[0px] pr-[50px] shadow-lg shadow-black/50">
      <Link
        href={`/genius-profile/${username}`}
        className="absolute -right-3 -top-9 size-[62px] overflow-hidden rounded-full border-2 bg-white/60"
      >
        <Avatar className="relative size-14">
          <AvatarImage src={profilePic || undefined} alt={username} />
          <AvatarFallback>
            <UserRound className="size-14 text-black" />
          </AvatarFallback>
        </Avatar>
      </Link>

      {/* Top section with cash and diamonds */}
      <div className="absolute -top-6 flex h-[20px] w-[78%] select-none justify-between">
        <div className="flex gap-x-1 text-xs">
          <div className="flex size-[19px] items-center justify-center rounded-full border-2 border-green-500 text-green-500">
            <GiCash />
          </div>
          <p style={{ color: "#ffffff", textShadow: "1px 1px 2px #00FF00" }}>
            {/* {user?.credits?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
              "0"} */}
            {isLoggedIn ? "170782" : "0"}
          </p>
        </div>
        <div className="flex gap-x-1 text-xs">
          <div className="flex size-[19px] items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500">
            <IoDiamondSharp />
          </div>
          <p style={{ color: "#ffffff", textShadow: "1px 1px 2px #FFFF00" }}>
            {/* {user?.diamonds?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
              "0"} */}
            {isLoggedIn ? "1297659" : "0"}
          </p>
        </div>
        <div className="size-[19px] rounded-full border-2 border-white bg-black text-white transition-all duration-300 ease-in-out">
          <MdOutlineDarkMode />
        </div>
      </div>

      {/* Tabs */}
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={
            tab === "Mobile"
              ? handleMobileButtonClick
              : () => handleTabClick(tab)
          }
          className={`flex size-[26px] items-center justify-center rounded-full shadow-black drop-shadow-lg 
            transition-all duration-200 ease-in-out
            hover:bg-black/40 
            ${
              selectedTab === tab
                ? "bg-yellow-500 text-black"
                : "bg-gray-400 text-white"
            }`}
        >
          {tab === "Cart" ? (
            <IoCart size={16} />
          ) : tab === "Edit" ? (
            <FaCreditCard size={16} />
          ) : tab === "Wallet" ? (
            <HiMiniWallet size={16} />
          ) : tab === "Mobile" ? (
            <FaMobile size={16} />
          ) : tab === "Settings" ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Settings size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={logoutAndToggleSidebar}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      ))}
    </div>
  );
}
