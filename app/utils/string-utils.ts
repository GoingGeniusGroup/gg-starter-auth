export const toTitleCase = (str: string) => {
  // Handle empty string
  if (!str) return "";

  // Split on hyphens, underscores, and forward slashes
  return str
    .split(/[-_/]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
