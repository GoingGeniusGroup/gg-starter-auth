import Image from "next/image";
import Link from "next/link";
import logo from "@/public/svgs/GGLOGO.svg";
import ProfileHudTop from "../Huds/ProfileHudTop";
import { ThemeSwitcher } from "../ThemeToggler/ThemeSwitcher";
import Search from "./Search";
import { NavbarCartWrapper } from "./NavbarCartWrapper";

const Navbar = async () => {
  return (
    <nav className="mx-auto py-2 px-6 flex justify-between items-center border-b-2 shadow-sm">
      <Link href={"/"} className="flex items-center">
        <Image
          src={logo || "/placeholder.svg"}
          alt="GGLogo"
          width={200}
          height={200}
          className="w-full h-16"
        />
      </Link>

      <Link href={"/shop"} className="flex items-center">
        <h2 className="font-bold text-xl">SHOP</h2>
      </Link>

      <div className="mt-4 flex justify-center md:justify-end w-[300px]">
        <Search />
      </div>

      <div className="flex items-center gap-4">
        <NavbarCartWrapper />
        <ThemeSwitcher />
        <ProfileHudTop />
      </div>
    </nav>
  );
};

export default Navbar;
