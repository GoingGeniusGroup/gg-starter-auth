// import { getUserAvatars } from "@/actions/avatar";
// import { currentUser } from "@/lib/auth";
// import AvatarManagerClient from "./avatar-manager-client";

// type AvatarType = {
//   avatar_id: string;
//   avatar_url: string;
// };

// export default async function AvatarManagerServer() {
//   const user = await currentUser();

//   if (!user) {
//     return <div>Please sign in to manage your avatars.</div>;
//   }

//   const avatarsResponse = await getUserAvatars(user.gg_id);
//   const avatars: AvatarType[] =
//     avatarsResponse.success && Array.isArray(avatarsResponse.data)
//       ? avatarsResponse.data
//       : [];
//   return <AvatarManagerClient initialAvatars={avatars} user={user} />;
// }
