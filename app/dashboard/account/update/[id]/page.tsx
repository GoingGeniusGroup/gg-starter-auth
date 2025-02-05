"use client"
import { Button } from '@/app/components/ui/border/moving-border'
import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { updateUserDetail ,getUserDetail} from '@/action/user';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { toast } from "sonner";
interface UserData {
    fullName?: string;
    userName?: string[];
    email?: string[];
    mobilePhone?: string[];
    imageUser?: string[];
    address?: string[];
}
interface UserProps{
    params:{
        id:string
    }
}
const UpdateUser: React.FC<UserProps> = ({params}) => {
    const {id}=params
        const [userInfo, setUserInfo] = useState<any>(null);
        const uploadkey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;

      const [uploadedImgUrls, setUploadedImgUrls] = useState<string[]>([]);
        const [allImages, setAllImages] = useState<string[]>([]);
            const [loading, setLoading] = useState<boolean>(true);
            const {theme}=useTheme()
            const { register, handleSubmit, reset } = useForm<any>();
              useEffect(() => {
                    async function fetchData() {
                        setLoading(true);
                        try {
                            const response = await getUserDetail(id);
                            if (response.success && response.data) {
                                console.log(response.data); 
                                setUserInfo(response.data);
                                reset(response.data); 
                                setAllImages(response.data.imageUser || []); 
            
                            } else {
                                console.error("Failed to fetch user data");
                            }
                        } catch (error) {
                            console.error("Failed to fetch data", error);
                        }
                        finally{
                            setLoading(false)
                        }
                    }
                    fetchData();
                }, [id]);
                const handleRemoveImage = (index: number) => {
                    setAllImages((prev) => prev.filter((_, i) => i !== index));
                  };
                  const onSubmit = async (data: UserData) => {
                    const formData = new FormData();
                    formData.append("fullName", data.fullName || "");
                    formData.append("userName", data.userName?.join(",") || "");
                    formData.append("email", data.email?.join(",") || "");
                    formData.append("mobilePhone", data.mobilePhone?.join(",") || "");
                    formData.append("address", data.address?.join(",") || "");
                    
                      allImages.forEach((url) => formData.append("imageUser", url));
            
                    try {
                        const response = await updateUserDetail(formData, id);
                        if (response.success) {
                            console.log('user updated')
                            setUserInfo(response.data);
                          toast.success("Your profile has been updated successfully")
                            
                        } else {
                            console.error(response.message);
                        }
                    } catch (error) {
                        console.error("Error updating user details", error);
                    }
                    
                };
        if(loading){
            return <div>Loading...</div>
        }
  return (
    <div className="flex justify-center items-center ">
    <div className="rounded-lg shadow shadow-gray-300 my-4 dark:shadow-gray-50 p-6 bg-white dark:bg-black w-full max-w-lg">
        <h2 className="text-xl mb-3 font-semibold text-center">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2 mb-2'>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize">
                    Full Name
                </label>
                <input
                    type="text"
                    {...register("fullName")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className='space-y-2 mb-2'>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize">
                    User Name
                </label>
                <input
                    type="text"
                    {...register("userName.0")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className='space-y-2 mb-2'>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize">
                    Email
                </label>
                <input
                    type="email"
                    {...register("email.0")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className='space-y-2 mb-2'>
                <label className="block text-sm dark:text-slate-100 font-medium text-gray-700 capitalize">
                    Mobile Phone
                </label>
                <input
                    type="text"
                    {...register("mobilePhone.0")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className='space-y-2 mb-2'>
                <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 capitalize">
                    Address
                </label>
                <input
                    type="text"
                    {...register("address.0")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 capitalize">
                Image
            </label>
            <div className="flex gap-4 flex-wrap mt-2 mb-2">
                {allImages.map((url, index) => (
                    <div key={index} className="relative">
                        <Image
                            src={url}
                            alt={`Image ${index + 1}`}
                            width={96}
                            height={96}
                            className="object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <FileUploaderRegular
                multiple
                sourceList="local, url, gdrive"
                classNameUploader={theme === "dark" ? "uc-dark" : "uc-light"}

                pubkey={`${uploadkey}`}
                imgOnly={true}
                onChange={(event) => {
                    const files = event.successEntries;
                    if (files.length > 0) {
                        const urls = files.map(file => file.cdnUrl);
                        setUploadedImgUrls(urls);
                    }
                }}
            />

            <div className='flex justify-between items-center gap-3 mt-4 mb-6'>
                <Link href="/dashboard/account" className='w-full'>
                <button
                    type="button"
                    className="px-6 py-3 w-full text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    Cancel
                </button>
                </Link>
           
                <button
                    type="submit" 
                    value="submit"
                    className="px-6 w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
                
                
              
            </div>
        </form>
    </div>
</div>

  )
}

export default UpdateUser