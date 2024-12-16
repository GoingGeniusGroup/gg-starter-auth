import { cn } from "@/lib/utils";
import { IconHome, IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TopFloatingDock = ({
  items,
  className,
  handleIsOpen,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    link: string;
  }[];
  handleIsOpen: () => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [activeIconTitle, setActiveIconTitle] = useState<string>("Home");
  const [activeIcon, setActiveIcon] = useState<React.ReactNode>(<IconHome />); // Default is Home icon

  useEffect(() => {
    // Update the active icon based on the current path
    const activeItem = items.find((item) => item.link === pathname);
    if (activeItem) {
      setActiveIcon(activeItem.icon);
      setActiveIconTitle(activeItem.title);
    }
  }, [pathname, items]);

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
        {/* Show the active icon in the button, default is the Home icon */}
        {activeIcon}
      </button>
      <div
        className={`absolute ${
          open
            ? "left-[68px] dark:text-sky-600/70 text-black"
            : "left-[48px] dark:text-white/70 text-black/70"
        } top-[9px]  uppercase transition-all duration-300 ease-in-out font-bold `}
      >
        {activeIconTitle}
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
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.link}
                  className={cn(
                    "h-10 w-10 rounded-full bg-white dark:bg-neutral-900 border-2 flex items-center justify-center shadow-lg relative group hover:text-sky-400",
                    pathname === item.link && "bg-sky-100 dark:bg-sky-900"
                  )}
                >
                  <div
                    className={cn(
                      "size-4 flex flex-col gap-[2px] justify-center items-center ",
                      pathname === item.link && "text-sky-600"
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
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopFloatingDock;
