"use client";

import { login } from "@/actions/login";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const LoginForm = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
            return toast.error(data.error.message);
          }
          if (data.code === 200 && data.message.includes("two-factor")) {
            toast.success(data.message);
            return router.push("/two-factor");
          }
          // If login is successful without 2FA:
          // 1. Show success message
          toast.success("Login successful! Redirecting...");

          // 2. Small delay to ensure toast is shown
          setTimeout(() => {
            // 3. Reload the entire page
            window.location.reload();

            // 4. Optional: Replace current history entry with home page
            window.location.href = "/";
          }, 1000);
        })
        .catch(() => toast.error("Something went wrong."));
    });
  });

  return (
    <CardWrapper
      headerTitle="Login"
      headerDescription="Welcome back! Please fill out the form below before logging in to the website."
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/register"
      isMobile={isMobile}
      showSocial
    >
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
            <div>
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="******"
                isPending={isPending}
              />
              {/* <Button
                size="sm"
                variant="anylink"
                className={`-mt-6 p-0 text-xs w-full justify-end`}
                asChild
              >
                <Link href="/reset">Forgot password?</Link>
              </Button> */}
            </div>
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
