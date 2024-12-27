"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel/carousel";
import Image from "next/image";

export default function ExpressionCard({
  expressions,
  handleEmote,
}: {
  expressions: { label: string; icon: string; bg: string; animation: string }[];
  handleEmote: (emote: string) => void;
}) {
  return (
    <>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {expressions.map((expression, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/6"
              onClick={() => handleEmote(expression.animation)}
            >
              <Card
                className={`w-[60px] h-[75px] rounded-lg flex hover:border-2 items-center justify-center transition-colors duration-300 border`}
                style={{
                  borderColor: expression.bg,
                  backgroundColor: "white",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = expression.bg;
                }}
              >
                <div className="relative">
                  <Image
                    src={expression.icon}
                    className="object-cover"
                    alt={expression.label}
                    height={72}
                    width={72}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
