import { Layout } from "@/components/dom/Layout";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import Navbar from "../components/navbar/Navbar";

export default async function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Navbar />
        <div className="w-full px-8 py-4 flex-1 overflow-auto">{children}</div>
      </div>
    </>
  );
}
