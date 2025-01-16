"use client";
import { useState } from "react";

interface ToggleButtonProps {
  setActiveState: (state: boolean) => void;
}

export default function ToggleButton({ setActiveState }: ToggleButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    setActiveState(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
      relative w-[50px] h-[30px] rounded-full p-1 
      transition-colors duration-200 ease-in-out
      ${isActive ? "bg-gray-400" : "bg-gray-100"}
    `}
      aria-pressed={isActive}
      role="switch"
    >
      <div
        className={`
        absolute inset-y-1 left-1 w-[22px] h-[22px] 
        bg-white rounded-full shadow-lg 
        transform transition-transform duration-200 ease-in-out 
        flex items-center justify-center
        ${isActive ? "translate-x-[20px]" : "translate-x-0"}
      `}
      >
        {isActive ? (
          <img
            src="/assets/virtual.svg"
            alt="VR Avatar"
            className="w-4 h-4 rounded-full"
          />
        ) : (
          <img
            src="/assets/earth.svg"
            alt="Earth Avatar"
            className="w-4 h-4 rounded-full"
          />
        )}
      </div>
    </button>
  );
}
