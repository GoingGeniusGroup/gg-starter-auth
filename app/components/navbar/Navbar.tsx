import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between  border-b-2 bg-gray-50">
      <Link href={"/"} className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="schedular logo"
          width={150}
          height={150}
          className="w-full h-16"
        />
      </Link>

      <div className="flex items-center gap-4"></div>
    </nav>
  );
};

export default Navbar;
