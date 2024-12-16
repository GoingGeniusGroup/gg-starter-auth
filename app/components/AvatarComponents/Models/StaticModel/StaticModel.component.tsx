import React, { FC, Ref } from "react";
import { Model } from "@/components/AvatarComponents/Models/Model";
import {
  useEmotion,
  useFallback,
  useGltfLoader,
} from "@/services/avatar/index";
import { Group } from "three";
import { useGraph } from "@react-three/fiber";
import { BaseModelProps } from "@/types/avatar";
import { Emotion } from "@/components/Avatar/Avatar.component";

export interface StaticModelProps extends BaseModelProps {
  modelSrc: string | Blob;
  modelRef?: Ref<Group>;
  scale?: number;
  emotion?: Emotion;
}

export const StaticModel: FC<StaticModelProps> = ({
  modelSrc,
  modelRef,
  scale = 1,
  setModelFallback,
  onLoaded,
  emotion,
  bloom,
}) => {
  const { scene } = useGltfLoader(modelSrc);
  const { nodes } = useGraph(scene);

  useEmotion(nodes, emotion);
  useFallback(nodes, setModelFallback);

  return (
    <Model
      modelRef={modelRef}
      scene={scene}
      scale={scale}
      onLoaded={onLoaded}
      bloom={bloom}
    />
  );
};
