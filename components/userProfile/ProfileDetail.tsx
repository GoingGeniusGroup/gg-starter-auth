"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface UserData {
    fullName?: string;
    userName?: string[];
    email?: string[];
    mobilePhone?: string[];
    imageUser?: string[];
    address?: string[];
}

interface UserProps {
    userId: string;
}

import { getUserDetail,updateUserDetail } from '@/action/user';

const ProfileDetail = ({ userId }: UserProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    const { register, handleSubmit, reset } = useForm<any>();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getUserDetail(userId);
                if (response.success && response.data) {
                    console.log(response.data); 
                    setUserInfo(response.data);
                    reset(response.data); 
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchData();
    }, [userId]);

    const onSubmit = async (data: UserData) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName || "");
        formData.append("userName", data.userName?.join(",") || "");
        formData.append("email", data.email?.join(",") || "");
        formData.append("mobilePhone", data.mobilePhone?.join(",") || "");
        formData.append("address", data.address?.join(",") || "");
        try {
           
            const response = await updateUserDetail(formData, userId);
            if (response.success) {
                console.log('user updated')
                setUserInfo(response.data);
                setIsEditing(false); 
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error updating user details", error);
        }
        
    };

    return (
        <div className='rounded-lg shadow-lg p-6'>
            <h2 className="text-xl mb-3 font-semibold">Profile Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-2 mb-2'>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        Full Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            {...register("fullName")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-gray-900  px-2 py-2">{userInfo?.fullName|| 'N/A'}</p>
                    )}
                </div>
                <div className='space-y-2 mb-2'>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        User Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            {...register("userName.0")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-gray-900  px-2 py-2">{userInfo?.userName}</p>
                    )}
                </div>

                <div className='space-y-2 mb-2'>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        Email
                    </label>
                    {isEditing ? (
                        <input
                            type="email"
                            {...register("email.0")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-gray-900  px-2 py-2">{userInfo?.email?.[0]}</p>
                    )}
                </div>

                <div className='space-y-2 mb-2'>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        Mobile Phone
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            {...register("mobilePhone.0")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-gray-900 px-2 py-2">{userInfo?.mobilePhone?.[0]}</p>
                    )}
                </div>

                <div className='space-y-2 mb-2'>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        Address
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            {...register("address.0")}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-gray-900 px-2 py-2">{userInfo?.address?.[0] ||"N/A"}</p>
                    )}
                </div>

                <div className='flex  justify-between items-center mt-4 mb-6'>
    {isEditing ? (
        <>
          <button
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-6  py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
                Cancel
            </button>
            <input
                type="submit" 
                value="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            />
    
          
        </>
    ) : (
        <button
            type='button' 
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
        >
            Update
        </button>
    )}
</div>

            </form>
        </div>
    );
}

export default ProfileDetail;
