"use client";

import { cn } from "@/lib/utils";
import { IconUser } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TopFloatingDock2 = ({
  items,
  className,
  handleIsOpen,
  activeSection,
  onSectionClick,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    link: string;
  }[];
  handleIsOpen: () => void;
  className?: string;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}) => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
    handleIsOpen();
  };

  return (
    <div className={cn("fixed top-[92px] left-8 z-30", className)}>
      <button
        onClick={handleOpen}
        className="h-10 relative w-10 rounded-full bg-white border-2 dark:bg-neutral-800 flex items-center justify-center shadow-lg"
      >
        {items.find((item) => item.title === activeSection)?.icon || (
          <IconUser />
        )}
      </button>
      <div
        className={`absolute ${
          open
            ? "dark:text-[#FCBB3F]/70 text-black"
            : "dark:text-white/70 text-black/70"
        } top-[8px] left-[68px] uppercase backdrop-blur-sm rounded-md border-2 px-2 transition-all duration-300 ease-in-out font-bold`}
      >
        {activeSection}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute top-full mt-2 left-0 flex flex-col gap-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => onSectionClick(item.link)}
                  className={cn(
                    "h-10 w-10 rounded-full bg-white dark:bg-neutral-900 border-2 flex items-center justify-center shadow-lg relative group hover:text-sky-400",
                    activeSection === item.title && "bg-sky-100 dark:bg-sky-900"
                  )}
                >
                  <div
                    className={cn(
                      "size-4 flex flex-col gap-[2px] justify-center items-center",
                      activeSection === item.title && "text-sky-600"
                    )}
                  >
                    {item.icon}
                    <span className="flex md:hidden text-[4px]">
                      {item.title}
                    </span>
                  </div>

                  <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-white dark:bg-neutral-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    {item.title}
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopFloatingDock2;
