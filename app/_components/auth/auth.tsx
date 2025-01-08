"use client";

import { Session } from "next-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthProps {
  session: Session;
}

export default function Auth({ session }: AuthProps) {
  const router = useRouter();

  useEffect(() => {
    if (session.user.role === "Admin") {
      router.push("/dashboard");
    } else if (session.user.role === "User") {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <h1>Redirecting....</h1>
    </>
  );
}
