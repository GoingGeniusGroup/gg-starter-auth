import { Metadata } from "next";
import HeroSection from "@/components/landingPage/HeroSection";
import About from "../components/landingPage/About";
import Service from "../components/landingPage/Service";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <HeroSection />
      <About />
      <Service />
    </div>
  );
}
