import { UserRole } from "@prisma/client";
import "next-auth";

export interface User {
  gg_id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  username?: string | null; // Make username optional
}

export type ExtendedUser = User;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedUser {}
}

declare module "@auth/core/jwt" {
  interface JWT extends ExtendedUser {}
}

declare module "next-auth/providers/github" {
  interface GithubProfile extends Omit<User, "id"> {}
}

declare module "next-auth/providers/google" {
  interface GoogleProfile extends Omit<User, "id"> {}
}
