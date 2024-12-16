// "use client";

// import { useState } from "react";
// import { updateProfile } from "@/actions/update-profile";
// import { useSession } from "next-auth/react";

// export default function SetUsername() {
//   const [username, setUsername] = useState("");
//   const { data: session, update } = useSession();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (session?.user?.id) {
//       const result = await updateProfile({ gg_id: session.user.id, username });
//       if (result.success) {
//         await update({ username });
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Set your username"
//         required
//       />
//       <button type="submit">Set Username</button>
//     </form>
//   );
// }
