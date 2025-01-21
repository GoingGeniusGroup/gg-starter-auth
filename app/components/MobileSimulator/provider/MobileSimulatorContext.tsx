"use client";

import { RegisterForm } from "@/components/form/register-form";
import { Button } from "@/components/ui/button/button";
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createContext } from "react";
import {
  FaBell,
  FaShoppingCart,
  FaSignInAlt,
  FaBriefcase,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";

import { MdInventory } from "react-icons/md";
import ShopSection from "../../shop/ShopSection";
import { LoginForm } from "@/components/form/login-form";
import { SectionProps } from "../interface/Section.interface";
import { useSession } from "next-auth/react";
import { BackgroundProps } from "../interface/Background.interface";
import MobileSimulatorContainer from "../MobileSimulatorContainer";
import SimulatorToggleButton from "../SimulatorToggleButton";
import NotificationComponent from "@/components/Notification/NotificationComponent";
import ShopComponent from "../../ShopComponent/ShopComponent";
import UserInventoryComponent from "../../UserInventory/UserInventoryComponent";
import { Card, CardContent } from "../../ui/card";
import ProfileComponent from "@/components/profile/subComponents/ProfileComponent";
import WalletComponent from "@/components/profile/subComponents/WalletComponent";
// import { getColorsbyUserId } from "@/services/color";
// import { ThemeType } from "@prisma/client";

interface MobileSimulatorContextType {
  showMobile: boolean;
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallScreen: boolean;

  sections: SectionProps[];
  toggleScreen: (section: SectionProps) => void;
  screens: SectionProps[];
  removeScreen: (id: number) => void;
  closeAllScreens: () => void;
  ColorPickerAttrs: {
    textColor: string;
    setTextColor: (color: string) => void;
    handleTextColorChange: (color: string) => void;
    currentBackground: BackgroundProps;
    setCurrentBackground: React.Dispatch<React.SetStateAction<BackgroundProps>>;
    // tempColor: { value: string; typeColor: ThemeType }[];
  };
}

const backgrounds = [
  {
    name: "Cosmic Nebula",
    class: "bg-gradient-to-b from-indigo-600 to-white-600  text-white",
  },
  // {
  //   name: "Cyberpunk City",
  //   class:
  //     "bg-gradient-to-b from-blue-900 to-purple-800  text-white",
  // },
  {
    name: "Cyberpunk City",
    class: "bg-gradient-to-b from-yellow-300 to-white-800  text-white",
  },
  {
    name: "Glimmering Stars",
    class:
      "bg-gradient-to-b from-pink-900 to-purple-800 via-red-700 text-white",
  },
  {
    name: "Dark Matter",
    class: "bg-gradient-to-b from-gray-900 to-black text-white",
  },
  {
    name: "Snowfall",
    class: "bg-gradient-to-b from-white to-gray-100 text-black",
  },
];

const MobileSimulatorContext = createContext<MobileSimulatorContextType | null>(
  null
);

export const MobileSimulatorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { status } = useSession();
  const [showMobile, setShowMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [currentBackground, setCurrentBackground] = useState<BackgroundProps>(
    backgrounds[0]
  );
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [activeScreens, setActiveScreens] = useState<number[]>([]);
  const [textColor, setTextColor] = useState("#000000");
  // const [tempColor, setTempColor] = useState<
  //   { value: string; typeColor: ThemeType }[]
  // >([]);
  const handleTextColorChange = (color: string) => {
    const formattedColor = color.startsWith("#") ? color : `#${color}`;
    setTextColor(formattedColor); // Set the new text color globally
  };

  // useEffect(() => {
  //   const fetchcolors = async () => {
  //     const response = await getColorsbyUserId();
  //     if (response) {
  //       response.map((colorObj) => {
  //         setTempColor((prev) => {
  //           return [
  //             ...prev,
  //             {
  //               value: colorObj.value,
  //               typeColor: colorObj.type,
  //             },
  //           ];
  //         });

  //         if (colorObj.type === "TEXT") {
  //           setTextColor(colorObj.value);
  //         } else {
  //           setCurrentBackground({
  //             name: "Custom Color",
  //             class: `bg-[${colorObj.value}]`,
  //           });
  //         }
  //       });
  //     }
  //   };

  //   fetchcolors();
  // }, []);

  // Directly compute isLoggedIn from session status
  const isLoggedIn = status === "authenticated";

  // Update showMobile when auth status changes
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setShowMobile(false);
  //   } else {
  //     setShowMobile(true);
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset screens when auth state changes
  useEffect(() => {
    setActiveScreens([]);
  }, [isLoggedIn]);

  const handleToggleAuth = useCallback(() => {
    setShowLogin((prev: any) => !prev);
  }, []);

  // Define sections with useMemo
  const sections: SectionProps[] = useMemo(
    () => [
      // Only show profile section if the user is not logged in
      ...(isLoggedIn
        ? [] // Don't add the Profile section when logged in
        : [
            {
              id: 1,
              title: showLogin ? "Login" : "Register",
              icon: showLogin ? <FaSignInAlt /> : <FaUserPlus />,
              content: showLogin ? (
                <Card className="flex flex-col gap-4 h-full overflow-auto">
                  <LoginForm isMobile={true} />
                  <CardContent className="text-sm flex items-center text-center">
                    Don`t have an Account?
                    <div
                      className="cursor-pointer hover:border-b-2 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
                      onClick={handleToggleAuth}
                    >
                      Register Here
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex flex-col gap-4 h-full overflow-auto">
                  <RegisterForm isMobile={true} />
                  <CardContent className="text-sm flex items-center text-center">
                    Already have an Account?
                    <div
                      className="cursor-pointer hover:border-b-2 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
                      onClick={handleToggleAuth}
                    >
                      Login Here
                    </div>
                  </CardContent>
                </Card>
              ),
            },
          ]),
      {
        id: 2,
        title: "Shop",
        icon: <FaShoppingCart />,
        // content: <ShopSection isMobile={true} />,
        content: <ShopComponent />,
      },
      {
        id: 3,
        title: "UserInventory",
        icon: <MdInventory />,
        content: <UserInventoryComponent />,
      },
      {
        id: 4,
        title: "UserProfile",
        icon: <FaUserCircle />,
        content: <ProfileComponent />,
      },
      {
        id: 5,
        title: "Wallet",
        icon: <FaBriefcase />,
        content: <WalletComponent />,
      },
      {
        id: 6,
        title: "Notifications",
        icon: <FaBell />,
        content: <NotificationComponent />,
      },
    ],
    [isLoggedIn, showLogin, handleToggleAuth]
  );

  const toggleScreen = useCallback((section: SectionProps) => {
    setActiveScreens((prev) => {
      const isOpen = prev.includes(section.id);
      if (isOpen) {
        return prev.filter((id) => id !== section.id);
      } else {
        return [section.id, ...prev].slice(0, 3);
      }
    });
  }, []);

  // Convert activeScreens IDs to actual screen objects
  const screens = useMemo(() => {
    return activeScreens
      .map((id) => sections.find((section) => section.id === id))
      .filter((section): section is SectionProps => section !== undefined);
  }, [activeScreens, sections]);

  const ColorPickerAttrs = {
    handleTextColorChange,
    textColor,
    setTextColor,
    currentBackground,
    setCurrentBackground,
    // tempColor,
  };

  return (
    <MobileSimulatorContext.Provider
      value={{
        showMobile,
        setShowMobile,
        isSmallScreen,

        sections,
        toggleScreen,
        screens,
        removeScreen: (id: number) =>
          setActiveScreens((prev) =>
            prev.filter((screenId) => screenId !== id)
          ),
        closeAllScreens: () => setActiveScreens([]),
        ColorPickerAttrs,
      }}
    >
      {children}
      <SimulatorToggleButton
        showMobile={showMobile}
        setShowMobile={setShowMobile}
      />

      {showMobile && (
        <>
          <MobileSimulatorContainer
            showMobile={showMobile}
            isSmallScreen={isSmallScreen}
            backgrounds={backgrounds}
            currentBackground={currentBackground}
            sections={sections}
            toggleScreen={toggleScreen}
            screens={screens}
            removeScreen={(id) =>
              setActiveScreens((prev) =>
                prev.filter((screenId) => screenId !== id)
              )
            }
            closeAllScreens={() => setActiveScreens([])}
            updateCurrentBackground={setCurrentBackground}
          />
        </>
      )}
    </MobileSimulatorContext.Provider>
  );
};

export const useMobileSimulator = () => {
  const context = useContext(MobileSimulatorContext);

  if (!context) {
    throw new Error(
      "useMobileSimulator must be used within a MobileSimulatorProvider"
    );
  }
  return context;
};
