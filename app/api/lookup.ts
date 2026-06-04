import type { Gender, Specialties } from "~/types";

export async function getSpecialties(): Promise<Specialties[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Lookup/specialties`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
}

export async function getGenders(): Promise<Gender[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Lookup/genders`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genders");
  }

  return (await response.json()) as Gender[];
}
