"use client"
import { getAllUsers } from '@/action/user';
import React,{useState,useEffect} from 'react'
import UserStat from './UserStat';
import UserTable from './UserTable';
import BeatLoader from "react-spinners/BeatLoader"; 

const UserInfoSection = () => {
     const [userInfo, setUserInfo] = useState<any[]>([]);
            const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        async function fetchData() {
          setLoading(true)
            try {
                const response = await getAllUsers();
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
    }, []);
    if (loading) {
      return (
        <div className="flex justify-center items-center my-20 h-full">
                               <BeatLoader color='#498d7f' loading={loading} size={16} /> 
                      </div>
      )
    }
  return (
    <div>
        <UserStat userInfo={userInfo}/>
        <UserTable userInfo={userInfo}/>
    </div>
  )
}

export default UserInfoSection