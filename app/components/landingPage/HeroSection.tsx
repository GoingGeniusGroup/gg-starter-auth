import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      {/*Heading and description*/}
      <div className="lg:w-1/2">
        <h1 className="text-7xl font-extrabold pb-6 gradient-title">
          Shop Your Way, Anytime
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Discover the easiest way to shop for physical and virtual products.
          Enjoy fast, secure payments with credit cards, Stripe, and more. Your
          perfect purchase is just a click away!
        </p>
        <Link href="/dashboard">
          <button className="flex items-center px-3 py-4 rounded-lg text-xl text-white bg-indigo-700 hover:bg-indigo-600">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      </div>

      {/*Poster*/}
      <div className="lg:w-1/2 flex justify-center">
        <div className="relative w-full aspect-square max-w-md">
          <Image
            src="/poster.png"
            alt="poster"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
