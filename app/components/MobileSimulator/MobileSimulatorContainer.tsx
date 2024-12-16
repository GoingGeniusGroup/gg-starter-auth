"use client";

import { AnimatePresence, motion } from "framer-motion";
import MobileScreen from "./MobileScreen";
import MobileUI from "./MobileUI";
import { BackgroundProps } from "./interface/Background.interface";
import { SectionProps } from "./interface/Section.interface";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface MobileSimulatorContainerProps {
  showMobile: boolean;
  screens: SectionProps[];
  isSmallScreen: boolean;
  backgrounds: BackgroundProps[];
  currentBackground: BackgroundProps;
  sections: SectionProps[];
  toggleScreen: (section: SectionProps) => void;
  removeScreen: (id: number) => void;
  closeAllScreens: () => void;
  updateCurrentBackground: (newBackground: BackgroundProps) => void;
}

export default function MobileSimulatorContainer({
  showMobile,
  screens,
  isSmallScreen,
  backgrounds,
  currentBackground,
  sections,
  toggleScreen,
  removeScreen,
  closeAllScreens,
  updateCurrentBackground,
}: MobileSimulatorContainerProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile simulator container */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            initial={{ opacity: 0, scale: isSmallScreen ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: isSmallScreen ? 1 : 0.9 }}
            className={`fixed inset-0 flex items-center z-40 justify-end ${
              isSmallScreen || pathname === "/"
                ? "backdrop-blur-sm"
                : "backdrop-blur-md"
            } p-4 z-20`}
          >
            <div
              className={`bg-none rounded-xl border-none overflow-hidden max-w-full h-full max-h-full flex gap-x-4 items-center ${
                isSmallScreen ? "size-full" : "gap-x-4"
              }`}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {screens.map((screen, index) => (
                  <MobileScreen
                    key={screen.id}
                    screen={screen}
                    index={index}
                    isSmallScreen={isSmallScreen}
                    removeScreen={removeScreen}
                    // Pass currentBackground
                  />
                ))}
              </AnimatePresence>

              <motion.div
                className="relative mr-14 rounded-xl bg-white/20 backdrop-blur-md overflow-hidden flex-shrink-0 shadow-lg"
                style={{
                  width: isSmallScreen ? "100%" : "335px",
                  height: isSmallScreen ? "100%" : "75vh",
                }}
              >
                <MobileUI
                  sections={sections}
                  toggleScreen={toggleScreen}
                  backgrounds={backgrounds}
                  closeAllScreens={closeAllScreens}
                  screens={screens}
                  updateCurrentBackground={updateCurrentBackground}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
