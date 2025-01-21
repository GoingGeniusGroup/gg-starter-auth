"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { normalizePhoneNumber, registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button/button";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { login } from "@/actions/login";
import { toast } from "sonner";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const RegisterForm = ({ isMobile }: { isMobile: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
    },
    mode: "onChange",
  });

  // Custom handler for username to replace spaces with hyphens
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\s+/g, "-");
    form.setValue("username", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Custom handler for phone number to ensure backspace works
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const cleaned = input.replace(/\D/g, "");
    form.setValue("phone_number", cleaned, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      const normalizedPhoneNumber = normalizePhoneNumber(values.phone_number);
      const registrationData = {
        ...values,
        phone_number: normalizedPhoneNumber,
      };

      register(registrationData).then((data) => {
        if (data.success) {
          login({
            login: normalizedPhoneNumber,
            password: values.password,
          })
            .then((loginData) => {
              if (loginData.success) {
                toast.success("Registration and login successful!");
                setTimeout(() => {
                  window.location.reload();
                  window.location.href = "/";
                }, 1000);
              } else {
                console.error("Login failed after registration:", loginData);
                toast.error(
                  "Registration successful, but login failed. Please try logging in manually."
                );
              }
            })
            .catch((error) => {
              console.error("Login error:", error);
              toast.error(
                "Something went wrong while logging in. Please try logging in manually."
              );
            });
        } else {
          toast.error(data.error?.message || "Registration failed");
        }
      });
    });
  });

  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle>Register Form</CardTitle>
        <CardDescription>
          Register your account by filling out the form below, make sure the
          data you enter is correct.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 text-black dark:text-white">
              <FormInput
                control={form.control}
                name="username"
                label="Username"
                type="text"
                placeholder="e.g. John-Doe"
                isPending={isPending}
                onChange={handleUsernameChange}
              />
              <FormInput
                control={form.control}
                name="phone_number"
                label="Phone Number"
                type="tel"
                placeholder="e.g. 1234567890"
                isPending={isPending}
                onChange={handlePhoneNumberChange}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email Address (optional)"
                type="email"
                placeholder="e.g. johndoe@example.com"
                isPending={isPending}
              />
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="******"
                isPending={isPending}
              />
            </div>
            <Button
              type="submit"
              disabled={isPending || !form.formState.isValid}
              className="w-full"
            >
              {isPending ? "Processing..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};
