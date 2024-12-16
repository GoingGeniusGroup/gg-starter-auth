"use server";
import { revalidateTag } from "next/cache";

export async function revalidateUser() {
  console.log("Revalidating user cache");
  try {
    revalidateTag("user");
    console.log("Revalidated successfully");
  } catch (error) {
    console.error("Revalidation error:", error);
  }
}
