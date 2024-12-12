// 'use client'
// import Navbar from '@/app/_components/navbar'
// import Loading from '@/app/loading'
// import { useLoadingState } from '@/components/CustomHooks/useLoadingState'
// import { currentUser } from '@/lib/auth'
// import { usePathname } from 'next/navigation'
// import React, { ReactNode, useRef, useState } from 'react'
// // import RightSideHud from '../GGHuds/RightSideHud'
// // import StatusHud from '../GGHuds/StatusHud'
// // import UserProfileHud from '../GGHuds/UserProfileHud'
// import { SidebarProvider, useSidebar } from './SidebarProvider'

// interface LayoutProps {
//   children: ReactNode
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const pathname = usePathname()
//   const user =  currentUser()
//   const ref = useRef<HTMLDivElement>(null)
//   const { setIsSidebarOpen, showSignUp, setShowSignUp, showSignIn, setShowSignIn } = useSidebar()
//   const isLoading = useLoadingState(1200)
//   const [openSignIn, setOpenSignIn] = useState(false)

//   const handleOpenSignIn = () => {
//     setOpenSignIn(!openSignIn)
//   }

//   return (
//     <div ref={ref}>
//       {/* {pathname !== '/slider' && <RightSideHud openSignIn={openSignIn} />} */}
//       <Navbar />
//       {isLoading && <Loading />}
//       {children}

//       {/* user profile and wallet info and status hud  */}
//       {user && pathname !== '/' && pathname !== '/slider' && pathname !== '/hud' && (
//         <>
//           <div className='fixed bottom-8 right-16 z-40'>
//             {/* <UserProfileHud /> */}
//           </div>
//           {/* <StatusHud /> */}
//         </>
//       )}
//     </div>
//   )
// }

// const LayoutWithProvider: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <SidebarProvider>
//       <Layout>{children}</Layout>
//     </SidebarProvider>
//   )
// }

// export { LayoutWithProvider as Layout }

