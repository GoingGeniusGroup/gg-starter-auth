"use client"
import { getAllUsers } from '@/action/user';
import React,{useState,useEffect} from 'react'
import UserStat from './UserStat';

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
  return (
    <div>
        <UserStat userInfo={userInfo}/>
    </div>
  )
}

export default UserInfoSection