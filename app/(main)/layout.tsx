import { Layout } from "@/components/dom/Layout";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export default async function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  async function handleServerSignOut() {
    "use server";

    try {
      await signOut({ redirect: false });
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Server logout error:", error);
      return { success: false, error: "Failed to logout" };
    }
  }

  return (
    <>
      <Layout handleServerSignOut={handleServerSignOut}>
        <TooltipProvider>{children}</TooltipProvider>
      </Layout>
    </>
  );
}
