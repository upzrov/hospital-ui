import type { Doctor } from "~/types/doctor";

export async function getDoctors(): Promise<Doctor[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Doctor`);

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
}
