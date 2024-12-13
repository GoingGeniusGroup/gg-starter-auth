import React, { FC, Ref } from "react";
import { useGraph } from "@react-three/fiber";
import { Model } from "@/components/comp/AvatarComponents/Models/Model";
import { Group } from "three";
import {
  mutatePose,
  useEmotion,
  useFallback,
  useGltfLoader,
} from "@/services/avatar/index";
import { BaseModelProps } from "@/types/avatar";
import { Emotion } from "@/components/comp/Avatar/Avatar.component";

export interface PoseModelProps extends BaseModelProps {
  modelSrc: string | Blob;
  poseSrc: string | Blob;
  modelRef?: Ref<Group>;
  scale?: number;
  emotion?: Emotion;
}

export const PoseModel: FC<PoseModelProps> = ({
  modelSrc,
  poseSrc,
  modelRef,
  scale = 1,
  emotion,
  setModelFallback,
  onLoaded,
  bloom,
}) => {
  const { scene } = useGltfLoader(modelSrc);
  const { nodes } = useGraph(scene);
  const pose = useGltfLoader(poseSrc);
  const { nodes: sourceNodes } = useGraph(pose.scene);

  mutatePose(nodes, sourceNodes);
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
