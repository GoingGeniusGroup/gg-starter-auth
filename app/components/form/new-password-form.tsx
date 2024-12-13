"use client";

import { newPassword } from "@/actions/new-password";
import { CardWrapper } from "@/app/components/auth/card-wrapper";
import { FormInput } from "@/app/components/auth/form-input";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { newPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type NewPasswordFormProps = {
  token: string;
};

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
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
      headerTitle="Reset your password"
      headerDescription="Enter a new password below to reset your password from your account."
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="password"
            label="New Password"
            type="password"
            placeholder="******"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="******"
            isPending={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
