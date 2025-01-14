import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/card/GGReal Icon.svg";
import { Layout } from "../dom/Layout";
import ProfileHudTop from "../Huds/ProfileHudTop";
import { signOut } from "@/app/auth";
import { revalidatePath } from "next/cache";

const Navbar = async () => {
  async function handleServerSignOut() {
    "use server";

    try {
      await signOut({ redirect: false });
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Server logout error:", error);
      return { success: false, error: "Failed to logout" };
    }
  }
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between border-b-2 shadow-sm">
      <Link href={"/"} className="flex items-center">
        <Image
          src={logo}
          alt="GGLogo"
          width={150}
          height={150}
          className="w-full h-16"
        />
      </Link>

      <div className="flex items-center gap-4">
        <ProfileHudTop handleServerSignOut={handleServerSignOut} />
      </div>
    </nav>
  );
};

export default Navbar;
