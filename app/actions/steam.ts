"use server";
import {
  getOwnedGames,
  getSteamPlayerSummary,
  getUserStatsForGame,
} from "@/services/steam";
import { z } from "zod";

const steamIdSchema = z.object({
  steamId: z.string().regex(/^[0-9]{17}$/, "Invalid Steam ID format"),
});

const steamIdAppIdSchema = z.object({
  steamId: z.string().regex(/^[0-9]{17}$/, "Invalid Steam ID format"),
  appId: z.number().int().positive("Invalid App ID"),
});

export const fetchSteamProfile = async (
  payload: z.infer<typeof steamIdSchema>
) => {
  const validatedFields = steamIdSchema.safeParse(payload);
  if (!validatedFields.success) {
    return {
      success: false,
      error: {
        code: 422,
        message: "Invalid Steam ID.",
      },
    };
  }

  const { steamId } = validatedFields.data;
  const playerData = await getSteamPlayerSummary(steamId);
  // console.log(playerData);
  if (!playerData) {
    return {
      success: false,
      error: {
        code: 404,
        message: "Steam profile not found.",
      },
    };
  }

  return {
    success: true,
    data: playerData,
  };
};

export const fetchOwnedGames = async (
  payload: z.infer<typeof steamIdSchema>
) => {
  const validatedFields = steamIdSchema.safeParse(payload);
  if (!validatedFields.success) {
    return {
      success: false,
      error: {
        code: 422,
        message: "Invalid Steam ID.",
      },
    };
  }

  const { steamId } = validatedFields.data;
  const ownedGames = await getOwnedGames(steamId);
  // console.log(ownedGames);
  if (!ownedGames) {
    return {
      success: false,
      error: {
        code: 404,
        message: "No games found or profile is private.",
      },
    };
  }

  return {
    success: true,
    data: ownedGames,
  };
};

export const fetchUserStatsForGame = async (
  payload: z.infer<typeof steamIdAppIdSchema>
) => {
  const validatedFields = steamIdAppIdSchema.safeParse(payload);
  if (!validatedFields.success) {
    return {
      success: false,
      error: {
        code: 422,
        message: "Invalid Steam ID or App ID.",
      },
    };
  }

  const { steamId, appId } = validatedFields.data;
  const userStats = await getUserStatsForGame(steamId, appId);
  // console.log(userStats);
  if (!userStats) {
    return {
      success: false,
      error: {
        code: 404,
        message: "User stats not found or game not owned.",
      },
    };
  }

  return {
    success: true,
    data: userStats,
  };
};
