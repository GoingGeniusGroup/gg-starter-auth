"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import AvatarSkeleton from "./skeleton/AvatarSkeleton";

const LazyAvatar = dynamic(
  () => import("@/components/Avatar/Avatar.component"),
  {
    ssr: false, // Disable server-side rendering
  }
);

export default function GeniusUserAvatar(profileOwner: any) {
  return (
    <Suspense fallback={<AvatarSkeleton />}>
      {LazyAvatar ? (
        <LazyAvatar
          modelSrc={
            "https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
          }
          shadows={false}
          animationSrc="/male-idle-3.fbx"
          style={{ background: "rgb(0,0,6)", pointerEvents: "none" }}
          fov={37}
          cameraTarget={0}
          cameraInitialDistance={5}
          effects={{ ambientOcclusion: false }}
          followModel={true}
          // Disable interactivity
          headMovement={false} // Disable head tracking
          idleRotation={true}
        />
      ) : (
        <AvatarSkeleton />
      )}
    </Suspense>
  );
}
