import { useState, useEffect, useRef } from "react";

interface ToolTip {
  content: string;
}

export default function CustomToolTip({ content }: ToolTip) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<"top" | "bottom">("top");

  useEffect(() => {
    const checkPosition = () => {
      if (tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        // Determine position based on space
        if (spaceAbove < 50 && spaceBelow > 50) {
          setPosition("bottom");
        } else {
          setPosition("top");
        }
      }
    };

    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, []);

  return (
    <div className="relative group">
      <div
        ref={tooltipRef}
        className={`
          absolute left-1/2 -translate-x-1/2 
          ${position === "top" ? "bottom-full mb-10" : "top-full mt-10"} 
          rounded-md dark:bg-black bg-gray-200 
          px-2 py-1 text-sm dark:text-white text-black 
          opacity-0 transition-opacity duration-200
          group-hover:opacity-100 group-hover:visible text-nowrap
        `}
      >
        {content}
      </div>
    </div>
  );
}
