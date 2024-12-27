import { atom } from "jotai/index";
import { SpawnState } from "@/types/avatar";

const initialSpawnState: SpawnState = {
  onLoadedEffect: null,
  onLoadedAnimation: null,
};

export const spawnState = atom(initialSpawnState);
