"use client"
import React,{useState,useEffect} from 'react'
import { getUserDetail,updateUserDetail } from '@/action/user';
import { Mail, Phone, Briefcase } from "lucide-react";
import { revalidatePath } from 'next/cache';
import ClipLoader from "react-spinners/ClipLoader"; 

interface UserProps {
    userId: string;
}
const ProfileCard = ({userId}:UserProps) => {
        const [userInfo, setUserInfo] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(true)

       useEffect(() => {
            async function fetchData() {
              setLoading(true)
                try {
                    const response = await getUserDetail(userId);
                    if (response.success && response.data) {
                        console.log(response.data); 
                        setUserInfo(response.data);
                    } else {
                        console.error("Failed to fetch user data");
                    }
                } catch (error) {
                    console.error("Failed to fetch data", error);
                }
                finally{
                  setLoading(false);
                }
            }
            fetchData();
        }, [userId]);
        if (loading) {
          return (
              <div className="flex justify-center items-center h-full">
                       <ClipLoader color='green' loading={loading} size={40} /> 
              </div>
          );
      }
  return (
    <>
          <div className="w-full  flex  ">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg px-7 py-20 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
          src="https://www.sourcenepal.com/wp-content/uploads/2023/10/Hari-Bansha-Acharya-Age.webp"
            alt="hari"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-slate-100">
            {userInfo?.userName[0]}
          </h1>
          <div className="flex items-center mt-2 text-gray-600 dark:text-slate-50">
            <Briefcase size={16} className="mr-2" />
            <span>Computer Engineer</span>
          </div>
          <div className="w-full mt-6 space-y-4">
            <div className="flex items-center text-gray-600  dark:text-slate-50">
              <Mail size={16} className="mr-3" />
              <span>{userInfo?.email[0]}</span>
            </div>
            <div className="flex items-center text-gray-600  dark:text-slate-50">
              <Phone size={16} className="mr-3" />
              <span>{userInfo?.mobilePhone[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileCard