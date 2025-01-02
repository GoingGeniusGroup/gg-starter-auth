// 'use client'

// import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'

// const cache = {
//   users: null,
//   guilds: null,
// }

// // Fetch data from the API
// const fetchData = async (url, errorMessage) => {
//   try {
//     const res = await fetch(url)
//     if (!res.ok) {
//       toast.error(errorMessage)
//       return []
//     }
//     return res.json()
//   } catch (error) {
//     toast.error('Internal Server Error')
//     return []
//   }
// }

// // Custom hook to fetch users and guilds data
// const useUserAndGuildData = () => {
//   const [users, setUsers] = useState([])
//   const [guilds, setGuilds] = useState([])

//   useEffect(() => {
//     const fetchUserAndGuildData = async () => {
//       if (!cache.users) {
//         const fetchedUsers = await fetchData('/api/public/users', 'Failed to fetch users data')

//         cache.users = fetchedUsers.filter(
//           (user) =>
//             user.username &&
//             user.email &&
//             user.description &&
//             user.faculty &&
//             user.region.ip &&
//             user.avatar.length !== 0 &&
//             user.guild_id,
//         )
//       }
//       setUsers(cache.users)

//       if (!cache.guilds) {
//         cache.guilds = await fetchData('/api/public/guilds', 'Failed to fetch guilds data')
//       }
//       setGuilds(cache.guilds)
//     }

//     fetchUserAndGuildData()
//   }, [])

//   return { users, guilds }
// }

// export default useUserAndGuildData
