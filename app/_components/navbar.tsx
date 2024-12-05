
import { signOut } from '@/auth'
import NavbarClient from '@/components/navbar/NavbarClient'
import { currentUser } from '@/lib/auth'
import { ExtendedUser } from "@/types/next-auth"

export default async function Navbar() {
  const user = await currentUser() as ExtendedUser | undefined

  async function handleServerSignOut() {
    "use server";
    await signOut()
  }

  async function handleOpenSignIn() {
    "use server";
    // Implement your server-side logic here
  }

  return (
    <NavbarClient 
      user={user}
      handleServerSignOut={handleServerSignOut}
      handleOpenSignIn={handleOpenSignIn}
    />
  )
}