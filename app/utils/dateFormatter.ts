/**
 * Calculates age from date of birth
 * @param dob Date of birth
 * @returns Object containing age and formatted date
 */
export const calculateAge = (
  dob: Date | null | string
): {
  age: number | null;
  formattedDob: string | null;
} => {
  if (!dob) {
    return {
      age: null,
      formattedDob: null,
    };
  }

  const birthDate = new Date(dob);

  // Return null if invalid date
  if (isNaN(birthDate.getTime())) {
    return {
      age: null,
      formattedDob: null,
    };
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  // Format date as DD/MM/YYYY
  const formattedDob = birthDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return {
    age,
    formattedDob,
  };
};
