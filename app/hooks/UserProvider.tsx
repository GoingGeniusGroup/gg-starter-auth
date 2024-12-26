"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/actions/userAndGuild";

// Define the context type
interface UserContextType {
  username: string[] | null;
  image: string[] | null;
  loading: boolean;
}

// Create context
const UserContext = createContext<UserContextType | null>(null);

// Create provider component
import { ReactNode } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string[] | null>(null);
  const [image, setImage] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getCurrentUser();
        setUsername(user?.userName || null);
        setImage(user?.imageUser || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername(null);
        setImage(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ username, image, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user data
export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
