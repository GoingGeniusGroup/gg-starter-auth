"use client";

import { resetPassword } from "@/actions/reset-password";
import { CardWrapper } from "@/app/components/auth/card-wrapper";
import { FormInput } from "@/app/components/auth/form-input";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ResetForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data.success) {
          router.push("/login");
          return toast.success(data.message);
        }
        return toast.error(data.error.message);
      });
    });
  });

  return (
    <CardWrapper
      headerTitle="Forgot Password"
      headerDescription="Please enter your email address. You will receive an email message with instructions on how to reset your password."
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Email Address"
            type="email"
            placeholder="e.g. johndoe@example.com"
            isPending={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Send reset link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
