"use client";

import { CartProvider } from "@/contexts/CartContext";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
