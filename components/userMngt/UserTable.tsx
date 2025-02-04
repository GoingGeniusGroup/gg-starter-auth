import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table1";
import Link from "next/link";
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
interface UserProps{
  userInfo:any[]
}
const UserTable = ({userInfo}:UserProps) => {
  return (
    <div>
        <Table className="w-full border-collapse border shadow rounded">
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableHead>UserName</TableHead>
              <TableHead>FullName</TableHead>
              <TableHead>Role</TableHead>

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
                <TableCell >{user.fullName}</TableCell>
                <TableCell >{user.role}</TableCell>

                <TableCell >{user.email[0]}</TableCell>
                <TableCell >{user.mobilePhone[0]}</TableCell>
                <TableCell >{user.address[0]}</TableCell>


                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      className="text-green-500 hover:text-green-700 text-xl"
                      aria-label="View"
                    >
                      <BiShow />
                    </button>
                    <Link
                      href={'/'}
                    >
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                    
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
  )
}

export default UserTable