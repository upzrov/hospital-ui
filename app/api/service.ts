import type { Service } from "~/types";

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Service`);

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
}
