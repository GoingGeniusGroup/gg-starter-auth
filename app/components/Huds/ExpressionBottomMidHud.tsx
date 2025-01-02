"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExpressionBottomMidHud({
  expressions,
  handleEmote,
}: {
  expressions: { label: string; icon: string; bg: string; animation: string }[];
  handleEmote: (emote: string) => void;
}) {
  return (
    <>
      <motion.div
        layout
        className="flex w-fit select-none items-center space-x-[6px] rounded-full border border-black/10 dark:border-white/20 hover:border-yellow-500/70 px-[4px] py-[3px] shadow-lg shadow-black/50 transition-all duration-300 ease-in-out"
      >
        {expressions.map((expression, i) => (
          <div
            key={i}
            className={`flex size-[32px] items-center justify-center cursor-pointer rounded-full bg-white shadow-black drop-shadow-lg transition-transform duration-300 ease-in-out `}
            onClick={() => handleEmote(expression.animation)}
          >
            <div className="flex size-full items-center justify-center rounded-full hover:bg-black/50 border border-black/20 dark:border-white/20 hover:border-yellow-500/70 transition-all duration-300 ease-in-out">
              <Image
                src={expression.icon}
                className="object-cover"
                alt={expression.label}
                height={31}
                width={31}
              />
            </div>
          </div>
        ))}
        <div
          className={`flex size-[32px] cursor-pointer items-center justify-center rounded-full border border-black/20 dark:border-white/20 hover:border-yellow-500/70 transition-all duration-300 ease-in-out shadow-black drop-shadow-lg`}
          onClick={() => handleEmote("/male-idle-3.fbx")}
        >
          <div className="flex size-full items-center justify-center rounded-full hover:bg-black/50">
            <Image
              src="/emojis/time.svg"
              className="object-cover text-black dark:text-white"
              alt="time"
              height={26}
              width={26}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
