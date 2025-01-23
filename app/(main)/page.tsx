import { Metadata } from "next";
import HeroSection from "@/components/landingPage/HeroSection";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
