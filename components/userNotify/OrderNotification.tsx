"use client"
import { getUserOrderMsg } from '@/action/userOrderNotification';
import React from 'react'
import { useEffect, useState } from "react";
import {Bell,} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}
interface OrderProps{
    user:any
  }
const OrderNotification = ({user}:OrderProps) => {
      const [loading, setLoading] = useState<boolean>(true)
      const [notifications, setNotifications] = useState<Notification[]>([]);
    useEffect(()=>{
        setLoading(true)
        async function fetchData(){
            try{
                if (user){
                    const response=await getUserOrderMsg(user.id)
                    if(response.success && response.data){
                        console.log(response.data)
                        setNotifications(response.data)
                    }else{
                        console.error("failed to fetch order message")
                    }
                }else{
                    console.error("User is undefined")
                }
            }
            catch(error){
                console.error("Failed to fetch data", error);

            }
            finally{
                setLoading(false)
            }
        }
        fetchData();
    },[user])
    if(loading){
        return <div>...</div>
    }
  return (
    <div className="w-full mx-auto p-4">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <Bell className="w-6 h-6 text-gray-400 mt-1" />
            <div className="flex-1">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-500">Dear {user?.username} , {notification.message}</p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderNotification