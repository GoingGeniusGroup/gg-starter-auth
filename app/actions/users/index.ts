import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

export default async function handleServerSignOut() {
  try {
    await signOut({ redirect: false });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Server logout error:", error);
    return { success: false, error: "Failed to logout" };
  }
}
