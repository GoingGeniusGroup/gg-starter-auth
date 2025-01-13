/* eslint-disable prefer-const */
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/
"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export const FloatingDockInverted = ({
  items,
  desktopClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-2 items-start rounded-2xl bg-transparent px-4 pb-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <IconContainer mouseX={mouseX} key={idx} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Get the current path

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Highlight the icon if the href matches the current path
  const isActive = href === pathname;

  // If active, the size increases slightly
  let widthTransform = useTransform(
    distance,
    [-150, 0, 150],
    isActive ? [50, 90, 50] : [40, 80, 40] // Larger when active
  );
  let heightTransform = useTransform(
    distance,
    [-150, 0, 150],
    isActive ? [50, 90, 50] : [40, 80, 40] // Larger when active
  );

  let widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    isActive ? [25, 45, 25] : [20, 40, 20] // Icon size larger when active
  );
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    isActive ? [25, 45, 25] : [20, 40, 20] // Icon size larger when active
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square rounded-xl flex items-center justify-center relative",
          isActive
            ? "border-2 border-blue-500 dark:border-blue-700 text-white" // Apply highlight style when active
            : "bg-gray-200 dark:bg-black " // Default background
        )}
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center relative" // add 'relative' to this div
        >
          {icon}
        </motion.div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: "90%" }} // adjust the y to move below the icon
              animate={{ opacity: 1, x: "-50%", y: "90%" }} // center tooltip
              exit={{ opacity: 0, x: "-50%", y: "90%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute top-[80%] left-1/2 transform -translate-x-1/2 mt-1 w-fit text-xs" // change '-bottom' to 'top-full' and add 'mt-1' for spacing
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
