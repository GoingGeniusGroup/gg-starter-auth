"use server";

import { signOut } from "@/auth";

export async function handleServerSignOut() {
  await signOut();
}
