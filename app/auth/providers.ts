import { loginSchema } from "@/schemas";
import {
  getUserByEmail,
  getUserByPhone,
  getUserByUsername,
} from "@/services/user";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const CredentialsProvider = Credentials({
  async authorize(credentials) {
    const validatedFields = loginSchema.safeParse(credentials);

    if (validatedFields.success) {
      const { login, password } = validatedFields.data;

      let user =
        (await getUserByEmail(login)) ||
        (await getUserByPhone(login)) ||
        (await getUserByUsername(login));

      if (!user || !user.password) return null;

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        //extract the email and username from the array
        const userName = Array.isArray(user.userName)
          ? user.userName[0]
          : user.userName;

        const userEmail = Array.isArray(user.email)
          ? user.email[0]
          : user.email;
        return {
          id: user.id,
          name: userName,
          email: userEmail,
          role: user.role,
          isTwoFactorEnabled: user.isTwoFactorEnabled,
          isOAuth: false,
        };
      }
    }

    return null;
  },
});

export const GithubProvider = Github({
  clientId: process.env.GITHUB_ID as string,
  clientSecret: process.env.GITHUB_SECRET as string,
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
      role: UserRole.User,
      isTwoFactorEnabled: false,
      isOAuth: true,
    };
  },
});

export const GoogleProvider = Google({
  clientId: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      role: UserRole.User,
      isTwoFactorEnabled: false,
      isOAuth: true,
    };
  },
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});
