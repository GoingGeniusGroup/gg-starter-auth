"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, UserRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { ExtendedUser } from "@/types/next-auth";
import { CgProfile } from "react-icons/cg";
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

interface ProfileHudProps {
  handleServerSignOut: () => Promise<{ success: boolean; error?: string }>;
}

export default function ProfileHudTop({
  handleServerSignOut,
}: ProfileHudProps) {
  const { data: session, status } = useSession();
  const usernameContext = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toggleScreen, setShowMobile } = useMobileSimulator();

  const username = usernameContext ? usernameContext.username : "";
  const profilePic = usernameContext ? usernameContext.image : "";

  const user = session?.user as ExtendedUser | undefined;

  const handleMobileButtonClick = () => {
    setShowMobile((prev) => !prev);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const logoutAndToggleSidebar = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      const loadingToast = toast.loading("Logging out...");

      // First handle server-side session cleanup
      const serverResult = await handleServerSignOut();

      if (!serverResult.success) {
        throw new Error(serverResult.error || "Server logout failed");
      }

      // Dismiss loading toast and show success message
      toast.dismiss(loadingToast);
      await delay(500);
      toast.success("Redirecting...");

      // Add delay to ensure toast is visible
      await delay(1000);

      // Handle client-side logout with redirect
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed top-2 right-7 z-50 flex size-[40px] select-none items-center rounded-full">
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
            <Link href={`/genius-profile/${username}`}>
              <DropdownMenuItem className="cursor-pointer">
                <CgProfile className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
          )}

          {!user ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleMobileButtonClick}
            >
              <CgProfile className="mr-2 size-4" />
              Open Mobile
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
