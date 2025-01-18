import React from 'react'
import { currentUser } from "@/lib/auth";

import { Mail, Phone, Briefcase } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
const page = async() => {
    const user = await currentUser();
console.log(user)
  return (
    <div className='m-2'>
        <Tabs defaultValue="account"   >
  <TabsList  className="grid w-full grid-cols-2 h-14" >
    <TabsTrigger value="account"  className="  text-lg py-2 border-b-2 border-transparent  transition duration-300 ease-in-out active:border-blue-500" >Information</TabsTrigger>
    <TabsTrigger value="password" className=" text-lg py-2 border-b-2 border-transparent  transition duration-300 ease-in-out active:border-blue-500" >My Orders</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
  <div className="w-full  flex items-center justify-center p-4  ">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
          src="https://www.sourcenepal.com/wp-content/uploads/2023/10/Hari-Bansha-Acharya-Age.webp"
            alt="hari"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-slate-100">
            {user?.username}
          </h1>
          <div className="flex items-center mt-2 text-gray-600 dark:text-slate-50">
            <Briefcase size={16} className="mr-2" />
            <span>Computer Engineer</span>
          </div>
          <div className="w-full mt-6 space-y-4">
            <div className="flex items-center text-gray-600  dark:text-slate-50">
              <Mail size={16} className="mr-3" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center text-gray-600  dark:text-slate-50">
              <Phone size={16} className="mr-3" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>

    </div>
  )
}

export default page