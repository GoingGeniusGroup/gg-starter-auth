import React from 'react'
interface UserProps{
    userInfo:any[]
}
const UserStat = ({userInfo}:UserProps) => {
    const adminCount = userInfo.filter(user => user.role === 'Admin').length;
    const userCount = userInfo.filter(user => user.role === 'User').length;
  return (
    <div>
         <main className='flex-1 p-2 mt-2'>
    <section className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow dark:text-gray-800  dark:bg-gray-300">Total User:{userInfo.length} </div>
            <div className="bg-white p-4 rounded shadow dark:text-gray-800  dark:bg-gray-300">Admin: {adminCount}
            </div>
            <div className="bg-white p-4 rounded shadow dark:text-gray-800  dark:bg-gray-300">User:{userCount} </div>
   </section>
    </main>
    </div>
  )
}

export default UserStat