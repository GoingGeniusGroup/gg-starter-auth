"use client";

import { profile } from "@/actions/profile";
import { FormInput } from "@/components/auth/form-input";
import { FormToggle } from "@/components/auth/form-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { ExtendedUser } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { profileSchema } from "@/schemas";

// Button
import { Button } from "@/components/ui/button/button";

type ProfileFormProps = {
  user: ExtendedUser;
  onProfileUpdate: (updatedUser: ExtendedUser) => void;
};

export const ProfileForm = ({ user, onProfileUpdate }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    values: {
      username: user.name || undefined,
      email: user.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      profile(values).then((data) => {
        if (data.success) {
          const updatedUser = {
            ...user,
            username: values.username,
            email: values.email,
            isTwoFactorEnabled: values.isTwoFactorEnabled ?? false,
          };
          onProfileUpdate(updatedUser);
          form.reset(values);
          toast.success(data.message);
        } else {
          toast.error(data.error.message);
        }
      });
    });
  });

  return (
    <div className="space-y-6 dark:text-white text-black">
      {/* Avatar Section with Circular Gradient and Hover Animation */}
      <div className="flex justify-center mb-4">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 relative">
          <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>
            <UserRound className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" />
          </AvatarFallback>
        </Avatar>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Only show email and password fields if not an OAuth user */}
          {!user.isOAuth && (
            <>
              <FormInput
                control={form.control}
                name="username"
                label="Name"
                type="text"
                placeholder="e.g. John Doe"
                className="input-with-floating-label"
                disabled={isPending}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="e.g. johndoe@example.com"
                isPending={isPending}
                disabled={user.isOAuth}
              />
              <FormInput
                control={form.control}
                name="password"
                label="Old Password"
                type="password"
                placeholder="******"
                autoComplete="off"
                isPending={isPending}
              />
              <FormInput
                control={form.control}
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="******"
                autoComplete="off"
                isPending={isPending}
              />
              <FormToggle
                control={form.control}
                name="isTwoFactorEnabled"
                label="Two-Factor Authentication"
                description="Protect your account with additional security by enabling two-factor authentication for login. You will be required to enter both your credentials and an authentication code to login."
                isPending={isPending}
              />
            </>
          )}

          {/* For OAuth users, show email but disable editing */}
          {user.isOAuth && (
            <>
              <FormInput
                control={form.control}
                name="username"
                label="Name"
                type="text"
                placeholder="e.g. John Doe"
                className="input-with-floating-label"
                disabled={true}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="e.g. johndoe@example.com"
                disabled={true}
              />
            </>
          )}

          <div className="w-full flex justify-center">
            {/* <SpotlightButton
              text={isPending ? "Updating..." : "Update Profile"}
              type="submit"
              isPending={isPending}
            /> */}
            <Button
              type="submit"
              className="w-full text-xs"
              size="sm"
              variant="black"
              disabled={user.isOAuth ? true : isPending}
            >
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
