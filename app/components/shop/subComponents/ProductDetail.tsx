"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Repeat,
  Volume2,
} from "lucide-react";
import { gsap } from "gsap";
import { Product } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import { Avatar } from "@/components/comp/Avatar";
import { Slider } from "@/components/ui/slider/slider";

interface ProductDetailProps {
  product: Product | null;
  onAddToCart: (productId: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (product && sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    // Reset play state and stop any playing audio when product changes
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (product && product.type === "sound" && product.src) {
      audioRef.current = new Audio(`/soundboard/${product.src}`);
      audioRef.current.loop = isLooping;
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [product, isLooping, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentImageIndex]);

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
    setIsLooping(!isLooping);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
  };

  if (!product) {
    return (
      <p className="text-center text-gray-500">
        Select a product to view details
      </p>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

      {product.type === "emote" ? (
        <div className="relative h-[256px] w-full">
          <Avatar
            modelSrc="https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb"
            animationSrc={product.animation}
            style={{ background: "rgb(0,0,6)" }}
            fov={35}
            cameraTarget={0}
            cameraInitialDistance={20}
            effects={{
              ambientOcclusion: true,
            }}
            followModel={true}
          />
        </div>
      ) : (
        <div ref={sliderRef} className="relative h-64 mb-4">
          <Image
            ref={imageRef}
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-contain"
            unoptimized
            loading="lazy"
          />
          <Button
            size="icon"
            variant="ghost"
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
              product.images.length === 1 ? "hidden" : ""
            }`}
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
              product.images.length === 1 ? "hidden" : ""
            }`}
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
      {product.type === "sound" && (
        <div className="flex justify-between gap-x-2 -mt-1">
          <div className="flex items-center w-[80%] gap-x-2">
            <Volume2 className="size-4" />
            <Slider
              defaultValue={[1]}
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          <div className="flex gap-x-2 justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={togglePlay}
                  variant="black"
                  className="flex justify-center items-center rounded-full size-7 p-0 hover:text-blue-600 transition-colors duration-200 shadow-md"
                >
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "Pause" : "Play"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleLoop}
                  variant="black"
                  className={`flex justify-center border-2 items-center rounded-full hover:border-green-400 transition-colors duration-200 size-7 p-0 shadow-md ${
                    isLooping
                      ? "shadow-green-400/50 text-green-600 border-green-400"
                      : ""
                  }`}
                >
                  <Repeat className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Loop</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
      <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-2">{product.description}</p>
      <Button
        onClick={() => onAddToCart(product.id)}
        variant="black"
        className="w-full"
      >
        Add to Cart
      </Button>
    </>
  );
};

export default ProductDetail;
