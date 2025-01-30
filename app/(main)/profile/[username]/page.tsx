import React from 'react'
import { currentUser } from "@/lib/auth";
import { User, ShoppingBag, Heart, Settings ,Bell,} from "lucide-react";
import { Mail, Phone, Briefcase } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import OrderDetailCard from '@/components/orderComp/OrderDetailCard';
import ProfileDetail from '@/components/userProfile/ProfileDetail';
import ProfileCard from '@/components/userProfile/ProfileCard';
import OrderNotification from '@/components/userNotify/OrderNotification';

const page = async() => {
        const user = await currentUser();
        
  return (
    <>
          <div className='w-full min-h-screen'>
            <div  className="py-2">
            <Tabs defaultValue="account"   >
  <TabsList  className="w-full justify-start flex md:flex-row gap-5 h-13 border-b border-gray-100 " >
    <TabsTrigger value="account"  className="  text-lg border-transparent transition duration-300 ease-in-out " > 
      
          Profile     <User size={18} className="ml-2" />
      </TabsTrigger>
    <TabsTrigger value="order" className="  text-lg  border-transparent  transition duration-300 ease-in-out active:border-blue-500" >My Orders
    <ShoppingBag size={18} className="ml-2" />
    </TabsTrigger>
    <TabsTrigger value="wishlist" className="  text-lg  border-transparent  transition duration-300 ease-in-out active:border-blue-500" >Wishlist
    <Heart size={18} className="ml-2" />

    </TabsTrigger>
    {/* className="  text-lg border-b-2 border-transparent  transition duration-300 ease-in-out active:border-blue-500"  */}
    <TabsTrigger value="notify" className="  text-lg  border-transparent  transition duration-300 ease-in-out active:border-blue-500" >
      Notification <Bell className='ml-2' size={18}/></TabsTrigger>

  </TabsList>
  <TabsContent value="account">
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
      <div className="w-full md:w-1/3">
      <div className="w-full  flex  ">
     
    {user && <ProfileCard userId={user.id}/>} 
    </div>
        </div>
        <div className='w-full md:w-2/3 p-2'>
        {user && <ProfileDetail userId={user.id}/>}   
        </div>
      </div>
    </div>

  </TabsContent>


  <TabsContent value="order">
  <div className="w-full min-h-screen p-6 flex justify-center items-start">
       {user && <OrderDetailCard user={user} />}
    </div>
  </TabsContent>
<TabsContent value="notify">
  <div className='w-full min-h-screen p-4 flex justify-center items-start'>
  {user && <OrderNotification user={user}/>}   

  </div>
</TabsContent>

</Tabs>
 </div>

    </div>
    </>
  )
}

export default page