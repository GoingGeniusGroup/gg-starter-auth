import { Metadata } from "next";
import HeroSection from "@/components/landingPage/HeroSection";
import About from "../components/landingPage/About";
import Service from "../components/landingPage/Service";
import Banner from "../components/landingPage/Banner";
import Testimonials from "../components/landingPage/Testimonials";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <HeroSection />
      <About />
      <Service />
      <Banner />
      <div className="mb-24">
        <h2 className="text-4xl font-semi-bold mb-12 gradient-title">
          What our users say
        </h2>
        <Testimonials />
      </div>
    </div>
  );
}
