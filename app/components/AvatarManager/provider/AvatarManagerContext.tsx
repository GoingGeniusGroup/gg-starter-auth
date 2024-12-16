"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { addAvatar, deleteAvatar, updateAvatar } from "@/actions/avatar";
import { AvatarExportedEvent } from "@/components/AvatarComponents/avatar_creator/events";
import { getAvatarsByUserId } from "@/services/avatar";
import { AvatarResponse } from "@/types/utils";
import { toast } from "sonner";

// Types
export type AvatarType = {
  avatar_id: string;
  avatar_url: string | undefined;
};

export type Expression = {
  label: string;
  icon: string;
  bg: string;
  animation: string;
};

interface AvatarContextType {
  avatars: AvatarType[];
  selectedAvatar: string | undefined;
  currentEmote: string;
  isAvatarCreatorOpen: boolean;
  editingAvatar: AvatarType | null;
  isProcessing: boolean;
  expressions: Expression[];
  setSelectedAvatar: (url: string | undefined) => void;
  setIsAvatarCreatorOpen: (isOpen: boolean) => void;
  handleCreateAvatar: () => void;
  handleEditAvatar: (avatar: AvatarType) => void;
  handleDeleteAvatar: (avatarId: string) => Promise<void>;
  handleAvatarCreated: (event: AvatarExportedEvent) => Promise<void>;
  handleUpdateAvatar: (event: AvatarExportedEvent) => Promise<void>;
  handleEmote: (emote: string) => void;
  extractUserId: (avatarUrl: string | undefined) => string | undefined;
  getAvatarCreatorUrl: (avatarUrl: string | undefined) => string;
}

// Create the context
const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

// Expression data
const defaultExpressions: Expression[] = [
  {
    label: "neutral",
    icon: "/emojis/neutral.svg",
    bg: "#FFFFFF",
    animation: "/male-idle-3.fbx",
  },
  {
    label: "sad",
    icon: "/emojis/sad.svg",
    bg: "#0C2E5C",
    animation: "/M_Standing_Expressions_011.fbx",
  },
  {
    label: "happy",
    icon: "/emojis/happy.svg",
    bg: "#007F13",
    animation: "/M_Standing_Expressions_012.fbx",
  },
  {
    label: "amazed",
    icon: "/emojis/amazed.svg",
    bg: "#F8BF43",
    animation: "/M_Standing_Expressions_013.fbx",
  },
  {
    label: "angry",
    icon: "/emojis/angry.svg",
    bg: "#A20325",
    animation: "/M_Standing_Expressions_016.fbx",
  },
];

interface AvatarProviderProps {
  children: ReactNode;
  initialAvatars: AvatarType[];
  user: string;
}

export function AvatarProvider({
  children,
  initialAvatars,
  user,
}: AvatarProviderProps) {
  const [avatars, setAvatars] = useState<AvatarType[]>(initialAvatars);
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    initialAvatars[0]?.avatar_url
  );
  const [currentEmote, setCurrentEmote] = useState<string>(
    defaultExpressions[0].animation
  );
  const [isAvatarCreatorOpen, setIsAvatarCreatorOpen] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState<AvatarType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchAvatars = async () => {
      const fetchedAvatars = await getAvatarsByUserId(user);
      if (fetchedAvatars) {
        setAvatars(
          fetchedAvatars.map((avatar) => ({
            avatar_id: avatar.avatar_id,
            avatar_url: avatar.avatar_url || undefined,
          }))
        );
      }
    };
    fetchAvatars();
  }, [user]);

  const handleCreateAvatar = useCallback(() => {
    setIsAvatarCreatorOpen(true);
    setEditingAvatar(null);
  }, []);

  const handleEditAvatar = useCallback((avatar: AvatarType) => {
    setIsAvatarCreatorOpen(true);
    setEditingAvatar(avatar);
  }, []);

  const handleAvatarCreated = useCallback(
    async (event: AvatarExportedEvent) => {
      setIsProcessing(true);
      try {
        const response = (await addAvatar(event.data.url)) as AvatarResponse;

        if (response.success) {
          setAvatars((prevAvatars) => [
            ...prevAvatars,
            {
              avatar_id: response.data.avatar_id,
              avatar_url: response.data.avatar_url,
            },
          ]);
          setSelectedAvatar(response.data.avatar_url);
          toast.success("Your new avatar has been successfully saved.");
        } else {
          throw new Error(response.error.message);
        }
      } catch (error) {
        console.error("Error adding avatar:", error);
        toast.error("Failed to save the avatar. Please try again.");
      } finally {
        setIsProcessing(false);
        setIsAvatarCreatorOpen(false);
      }
    },
    []
  );

  const handleUpdateAvatar = async (event: AvatarExportedEvent) => {
    if (editingAvatar) {
      setIsProcessing(true);
      try {
        const response = (await updateAvatar(
          editingAvatar.avatar_id,
          event.data.url
        )) as AvatarResponse;
        if (response.success) {
          setAvatars((prevAvatars) =>
            prevAvatars.map((avatar) =>
              avatar.avatar_id === editingAvatar.avatar_id
                ? {
                    ...avatar,
                    avatar_url: response.data.avatar_url,
                  }
                : avatar
            )
          );
          setSelectedAvatar(response.data.avatar_url);
          toast.success("Your avatar has been successfully updated.");
        } else {
          throw new Error(response.error.message);
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
        toast.error("Failed to update the avatar. Please try again.");
      } finally {
        setIsProcessing(false);
        setIsAvatarCreatorOpen(false);
        setEditingAvatar(null);
      }
    }
  };

  const handleDeleteAvatar = async (avatarId: string) => {
    try {
      const response = (await deleteAvatar(avatarId)) as AvatarResponse;
      if (response.success) {
        setAvatars((prevAvatars) =>
          prevAvatars.filter((avatar) => avatar.avatar_id !== avatarId)
        );
        if (avatars.length > 1) {
          setSelectedAvatar(
            avatars.find((avatar) => avatar.avatar_id !== avatarId)?.avatar_url
          );
        } else {
          setSelectedAvatar(undefined);
        }
        toast.success("Avatar successfully deleted.");
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      console.error("Error deleting avatar:", error);
      toast.error("Failed to delete the avatar. Please try again.");
    }
  };

  const handleEmote = (emote: string) => {
    setCurrentEmote(emote);
  };

  const extractUserId = (avatarUrl: string | undefined): string | undefined => {
    if (!avatarUrl) return undefined;
    const match = avatarUrl.match(/\/([^/]+)\.glb$/);
    return match ? match[1] : undefined;
  };

  const getAvatarCreatorUrl = (avatarUrl: string | undefined): string => {
    const userId = extractUserId(avatarUrl);
    if (userId) {
      return `https://gguser.readyplayer.me/avatar/${userId}?frameApi`;
    }
    return "https://gguser.readyplayer.me/avatar?frameApi";
  };

  const value = {
    avatars,
    selectedAvatar,
    currentEmote,
    isAvatarCreatorOpen,
    editingAvatar,
    isProcessing,
    expressions: defaultExpressions,
    setSelectedAvatar,
    setIsAvatarCreatorOpen,
    handleCreateAvatar,
    handleEditAvatar,
    handleDeleteAvatar,
    handleAvatarCreated,
    handleUpdateAvatar,
    handleEmote,
    extractUserId,
    getAvatarCreatorUrl,
  };

  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  );
}

// Custom hook to use the avatar context
export function useAvatar() {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
}
