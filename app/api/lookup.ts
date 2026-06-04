import type { Specialties } from "~/types";

export async function getSpecialties(): Promise<Specialties[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Lookup/specialties`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
}
