"use client";

import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";
import { useState } from "react";

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: true,
  language: "en",
};

export default function Avatar_Creator() {
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    // console.log(event.data.avatarId);
    setAvatarUrl(event.data.url);
  };

  // useEffect(() => {
  //   const createAvatar = async () => {
  //     const submit = {
  //       avatar_url: avatarUrl,
  //       gg_id: user.gg_id,
  //     };
  //     console.log("Submit: ", submit);
  //     try {
  //       await axios({
  //         url: "/api/internal/avatar",
  //         method: "POST",
  //         data: submit,
  //       });
  //       toast.success("Avatar Created Sucessfully");
  //     } catch (error) {
  //       console.error("Error: ", error);
  //       toast.error("Failed to create the avatar");
  //     }
  //   };
  //   if (user && avatarUrl !== "") {
  //     createAvatar();
  //   }
  // }, [avatarUrl]);

  return (
    <>
      <AvatarCreator
        subdomain="gguser"
        config={config}
        className="-ml-4 size-full rounded-lg border-none lg:ml-0"
        onAvatarExported={handleOnAvatarExported}
      />
    </>
  );
}
