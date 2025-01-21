"use client";

import { login } from "@/actions/login";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useMobileSimulator } from "../MobileSimulator/provider/MobileSimulatorContext";

interface LoginFormProps {
  isMobile: boolean;
}

export const LoginForm = ({ isMobile }: LoginFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) return;
          if (!data.success) {
            return toast.error(data.error?.message);
          }
          if (data.code === 200 && data.message?.includes("two-factor")) {
            toast.success(data.message);
            return router.push("/two-factor");
          }
          // If login is successful without 2FA:
          // 1. Show success message
          toast.success("Login successful! Redirecting...");

          // 2. Small delay to ensure toast is shown
          setTimeout(() => {
            if (data.data?.role === "Admin") {
              router.push("/dashboard");
            } else {
              window.location.reload();
            }
          }, 1000);
        })
        .catch(() => toast.error("Something went wrong."));
    });
  });

  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle>Login Form</CardTitle>
        <CardDescription>
          Welcome back! Login to your account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormInput
                control={form.control}
                name="login"
                label="Email, Phone, or Username"
                type="text"
                placeholder="e.g. johndoe@example.com or @johndoe"
                isPending={isPending}
              />

              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                isPending={isPending}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center"
            >
              {isPending ? (
                <span className="loader" aria-hidden="true" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};
