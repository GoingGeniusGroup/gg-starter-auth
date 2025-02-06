"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, UserRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { ExtendedUser } from "@/types/next-auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/UserProvider";
import { IconArrowDown } from "@tabler/icons-react";
import { useState } from "react";
import { useMobileSimulator } from "../MobileSimulator/provider/MobileSimulatorContext";

export default function ProfileHudTop() {
  const { data: session, status } = useSession();
  const usernameContext = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toggleScreen, setShowMobile, sections, closeAllScreens } =
    useMobileSimulator();

  const username = Array.isArray(usernameContext.username)
    ? usernameContext.username[0]
    : "";
  const profilePic = Array.isArray(usernameContext.image)
    ? usernameContext.image[0]
    : "";

  const user = session?.user as ExtendedUser | undefined;
  const admin = user?.role === "Admin";

  const handleMobileButtonClick = () => {
    setShowMobile(true);

    closeAllScreens();
    const loginSection = sections.find(
      (section) => section.title === "Login" || section.title === "Register"
    );
    if (loginSection) {
      toggleScreen(loginSection);
    } else {
      console.error("Login section not found");
    }
  };

  const logoutAndToggleSidebar = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      toast.loading("Logging out...");
      await signOut({ callbackUrl: "/" });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex size-[40px] select-none items-center rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="relative size-[40px] rounded-full bg-white dark:bg-gray-800 border transition-all duration-300 ease-in-out dark:border-white/20 hover:dark:border-white border-black/40 hover:border-black cursor-pointer">
            <div className="relative size-full flex justify-center items-center rounded-full">
              <AvatarImage
                className="size-full rounded-full"
                src={profilePic || undefined}
                alt={username || ""}
              />
              <AvatarFallback>
                <UserRound className="size-[20px] dark:text-white text-black" />
              </AvatarFallback>
            </div>
            <div className="absolute bottom-0 right-0 outline-none flex justify-center items-center size-3 overflow-hidden rounded-full dark:bg-white text-white dark:text-black bg-black">
              <IconArrowDown />
            </div>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {user && (
            <Link href={`/profile/${username}`}>
              <DropdownMenuItem className="cursor-pointer">
                <CgProfile className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
          )}
          {admin && (
            <Link href={`/dashboard`}>
              <DropdownMenuItem className="cursor-pointer">
                <MdOutlineDashboard className="mr-2 size-4" />
                dashboard
              </DropdownMenuItem>
            </Link>
          )}

          {!user ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleMobileButtonClick}
            >
              <CgProfile className="mr-2 size-4" />
              Open Mobile Login
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={logoutAndToggleSidebar}
              className="cursor-pointer text-red-600 dark:text-red-400"
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 size-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}