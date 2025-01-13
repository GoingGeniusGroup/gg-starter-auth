import { RegisterForm } from "@/components/form/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="relative flex max-w-screen-md">
      <RegisterForm isMobile={false} />
    </div>
  );
}
