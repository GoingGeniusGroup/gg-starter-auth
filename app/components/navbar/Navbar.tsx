import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/card/GGReal Icon.svg";
import shop from "@/public/assets/shop.svg";
import ProfileHudTop from "../Huds/ProfileHudTop";
import { ThemeSwitcher } from "../ThemeToggler/ThemeSwitcher";

const Navbar = async () => {
  return (
    <nav className="mx-auto py-2 px-6 flex justify-between border-b-2 shadow-sm">
      <Link href={"/"} className="flex items-center">
        <Image
          src={logo}
          alt="GGLogo"
          width={150}
          height={150}
          className="w-full h-16"
        />
      </Link>

      <Link href={"/shop"} className="flex items-center">
        <Image
          src={shop}
          alt="GGLogo"
          width={50}
          height={50}
          className="w-full h-12"
        />
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <ProfileHudTop />
      </div>
    </nav>
  );
};

export default Navbar;
