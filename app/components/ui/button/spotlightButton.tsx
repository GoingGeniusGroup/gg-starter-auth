import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ButtonProps {
  text: string;
  isPending: boolean;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

const SpotlightButton = ({ text, isPending, type, onClick }: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const button = btnRef.current;
    const span = spanRef.current;

    if (!button || !span) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { width } = button.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      span.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      span.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      type={type}
      disabled={isPending}
      onClick={onClick}
      className="relative w-full max-w-xs overflow-hidden rounded-lg bg-slate-950 px-4 py-2 text-lg font-medium text-white"
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
      />
    </motion.button>
  );
};

export default SpotlightButton;