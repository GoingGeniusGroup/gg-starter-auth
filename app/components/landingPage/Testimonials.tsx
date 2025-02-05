"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Rajesh Shrestha",
    role: "Retail Store Owner",
    content:
      "This POS system has completely streamlined my inventory and sales process. It's fast, reliable, and easy to use—perfect for managing my store efficiently!",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Anita Gurung",
    role: "Cafe Manager",
    content:
      "The reloadable card feature is a game-changer! Our customers love the convenience, and it has made transactions smoother than ever.",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Suman Thapa",
    role: "E-commerce Entrepreneur",
    content:
      "Managing both physical and virtual products has never been this simple. The POS system’s intuitive dashboard saves me hours every day!",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Priya Karki",
    role: "Supermarket Supervisor",
    content:
      "Our team loves how easy it is to top up and use the POS cards. It’s secure, fast, and makes handling large transactions hassle-free.",
    image: "https://i.pravatar.cc/150?img=1",
  },
];

const Testimonials = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }) as unknown as any
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="flex flex-col justify-between h-full p-6">
                <p className="text-gray-600 mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center mt-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Testimonials;
