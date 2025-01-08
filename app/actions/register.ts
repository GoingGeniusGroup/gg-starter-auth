"use server";

import { hashPassword, response } from "@/lib/utils";
import { registerSchema } from "@/schemas";
// import { sendVerificationSMS } from "@/services/sms"; // A hypothetical service for sending SMS
import { sendVerificationEmail } from "@/services/mail";
import { createUser, getUserByEmail, getUserByPhone } from "@/services/user";
import { generateVerificationToken } from "@/services/verification-token";
import { z } from "zod";

export const register = async (payload: z.infer<typeof registerSchema>) => {
  // Validate the input fields
  const validatedFields = registerSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }

  // Extract the fields from the validated payload
  const { username, email, password, phone_number } = validatedFields.data;

  // Check if user already exists by email (if provided) or phone number
  if (email) {
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return response({
        success: false,
        error: {
          code: 422,
          message: "Email address already exists. Please use another one.",
        },
      });
    }
  }

  const existingUserByPhoneNumber = await getUserByPhone(phone_number);
  if (existingUserByPhoneNumber) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Phone number already exists. Please use another one.",
      },
    });
  }

  // Hash the user's password
  const hashedPassword = await hashPassword(password);

  // Create the user
  await createUser({
    userName: username ? [username as string] : undefined,
    email: email ? [email as string] : undefined,
    password: hashedPassword,
    mobilePhone: phone_number ? [phone_number as string] : undefined,
  });

  // Generate a verification token and send verification (SMS or email)
  const verificationToken = await generateVerificationToken(phone_number);

  if (email) {
    await sendVerificationEmail(email, verificationToken.token);
  }

  // else {
  //   await sendVerificationSMS(phone_number, verificationToken.token); // Use SMS for phone-only registration
  // }

  // Return a success response
  return response({
    success: true,
    data: null,
    code: 201,
    message: email
      ? "Confirmation email sent. Please check your email."
      : "Verification SMS sent. Please check your phone.",
  });
};
