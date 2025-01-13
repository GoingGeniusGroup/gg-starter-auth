export interface UserCardData {
  first_name: string | null;
  last_name: string | null;
  guild?: "BUDDHA" | "VAJRA" | "PADMA" | "RATNA" | "KARMA" | null;
  guild_id: string | null;
  dob: Date | null;
  email: string | null;
  username: string | null;
  description: string | null;
  address: string | null;
  updatedAt?: string | null;
}
