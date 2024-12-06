"use server";

import { signIn } from "@/auth";
import { isExpired, response, signJwt } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { sendTwoFactorEmail } from "@/services/mail";
import {
  deleteTwoFactorConfirmationById,
  getTwoFactorConfirmationByUserId,
} from "@/services/two-factor-confirmation";
import { generateTwoFactorToken } from "@/services/two-factor-token";
import { getUserByEmail } from "@/services/user";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (payload: z.infer<typeof loginSchema>) => {
  // Check if user input is not valid, then return an error.
  const validatedFields = loginSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }

  const { email, password } = validatedFields.data;

  // Check if user, email and password doesn't exist, then return an error.
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Invalid credentials.",
      },
    });
  }

  // Check if passwords doesn't matches, then return an error.
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Invalid credentials.",
      },
    });
  }

  // Check if user's 2FA are enabled
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
    const hasExpired = isExpired(existingTwoFactorConfirmation?.expires!);

    // If two factor confirmation exist and expired, then delete it.
    if (existingTwoFactorConfirmation && hasExpired) {
      await deleteTwoFactorConfirmationById(existingTwoFactorConfirmation.id);
    }

    // If two factor confirmation doesn't exist or if two factor confirmation has expired, then handle 2fa
    if (!existingTwoFactorConfirmation || hasExpired) {
      const cookieStore = cookies();
      const token = signJwt(validatedFields.data);
      cookieStore.set("credentials-session", token);

      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

      return response({
        success: true,
        code: 200,
        message: "Please confirm your two-factor authentication code.",
      });
    }
  }

  // Then try to sign in with next-auth credentials.
  return await signInCredentials(email, password);
};

// Sign in credentials from next-auth
export const signInCredentials = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return response({
        success: false,
        error: {
          code: 401,
          message: "Invalid credentials.",
        },
      });
    }

    return response({
      success: true,
      code: 200,
      message: "Login successful.",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return response({
            success: false,
            error: {
              code: 401,
              message: "Invalid credentials.",
            },
          });
        // ... other cases ...
        default:
          console.error(error);
          return response({
            success: false,
            error: {
              code: 500,
              message: "An unexpected error occurred.",
            },
          });
      }
    }
    console.error(error);
    return response({
      success: false,
      error: {
        code: 500,
        message: "An unexpected error occurred.",
      },
    });
  }
};