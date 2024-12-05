'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  showSignUp: boolean
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>
  showSignIn: boolean
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showSignUp, setShowSignUp] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, showSignUp, setShowSignUp, showSignIn, setShowSignIn }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
