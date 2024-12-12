import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileCard from "./ProfileCard"; // ProfileCard component

// Custom hook to detect clicks outside a given element
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

const Topbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Close both dropdown and profile card when clicking outside
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
    setIsProfileCardVisible(false);
  });

  const handleProfileClick = () => {
    setIsProfileCardVisible(true); // Show profile card only when clicked
  };

  return (
    <header
      className={`sticky top-0 z-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 ${
        isCollapsed ? "pl-[105px]" : "pl-64"
      }`}
    >
      <div className="container flex h-14 items-center">
        {/* Search Bar */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-[300px] lg:w-[400px]">
            <Input
              type="search"
              placeholder="Search product, supplier, order"
              className="h-9 pl-10 focus-visible:ring-0"
            />
            <Image
              src="/assets/searchIcon.svg"
              alt="Search icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Notifications and user Avatar */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Image
              src="/assets/notificationIcon.svg"
              alt="Notification icon"
              className="h-5 w-5"
              width={20}
              height={20}
            />
          </Button>

          {/* Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Image
              src="/assets/userAvatar.svg"
              alt="user avatar"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
            {/* Profile Card Display */}
            {isProfileCardVisible && (
              <div
                className="absolute top-16 right-[162px]   w-[350px] bg-white shadow-lg rounded-md border border-gray-200 z-50"
                ref={profileCardRef}
                style={{
                  animation: "fadeIn 0.3s ease-in-out",
                  top: "calc(100% + 0.5rem)", // Position profile card just below the dropdown
                }}
              >
                <ProfileCard />
              </div>
            )}
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={handleProfileClick} // Show profile card on click
                >
                  <Image
                    src="/assets/profileIcon.svg"
                    alt="Profile icon"
                    className="h-5 w-5 mr-2"
                    width={20}
                    height={20}
                  />
                  Profile
                </button>

                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => alert("Logout clicked")}
                >
                  <Image
                    src="/assets/logoutIcon.svg"
                    alt="Logout icon"
                    className="h-5 w-5 mr-2"
                    width={20}
                    height={20}
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
