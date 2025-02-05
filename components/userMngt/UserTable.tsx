import React,{useState} from "react";
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table1";
import { toast } from "sonner";

import Link from "next/link";
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { removeUser } from "@/action/user";
interface UserProps {
  userInfo: any[];
}
const UserTable = ({ userInfo }: UserProps) => {
  const router = useRouter();
  const deleteUser=async(userId:string)=>{

    const confirmed = window.confirm("Are you sure you want to delete  this user account?");
    if(confirmed){
      try{
        const response=await removeUser(userId)
        if(response.success){
          toast.success("user deleted successfully")
          router.refresh();
          // window.location.reload(); 


          // setUserInfo((prevUsers) => prevUsers.filter(user => user.id !== userId));
          
        }
        else{
           console.error("Failed to delete user");
            toast.error("Failed to delete user");
        }
      } catch(error){
        console.error("Failed to delete user",error);
        toast.error("Failed to delete user");
      }
    }
  }
  return (
    <div>
      <Table className="w-full border-collapse border shadow rounded">
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>UserName</TableHead>
            <TableHead>FullName</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userInfo.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="text-blue-500">{user.userName}</TableCell>
              <TableCell>{user.fullName ? user.fullName : "N/A"}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.balance ? user.balance : "-"}</TableCell>
              <TableCell>{user.email[0]}</TableCell>
              <TableCell>{user.mobilePhone[0]}</TableCell>
              <TableCell>{user.address[0] ? user.address : "N/A"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    className="text-green-500 hover:text-green-700 text-xl"
                    aria-label="View"
                  >
                    <BiShow />
                  </button>
                  <Link href={`/dashboard/account/update/${user.id}`}>
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                    </Link>

                  <button
                  onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    aria-label="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
