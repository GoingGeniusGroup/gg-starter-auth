import { authConfig } from "@/auth/config";
import { db } from "@/lib/db";
import { isExpired } from "@/lib/utils";
import { getAccountByUserId } from "@/services/account";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { getUserById, updateUserById } from "@/services/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 Day
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await updateUserById(user.id, { emailVerified: new Date() });
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT Callback - Input:", { token, user, account });
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
        token.isOAuth = !!account;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      // Extracting email and username first index from array
      token.username = existingUser.userName
        ? existingUser.userName[0]
        : existingUser.userName;
      token.email = existingUser.email
        ? existingUser.email[0]
        : existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username as string;
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (existingUser?.isTwoFactorEnabled) {
        const existingTwoFactorConfirmation =
          await getTwoFactorConfirmationByUserId(existingUser.id);
        if (!existingTwoFactorConfirmation) return false;
        const hasExpired = isExpired(existingTwoFactorConfirmation.expires);
        if (hasExpired) return false;
      }

      return true;
    },
  },
  ...authConfig,
});
