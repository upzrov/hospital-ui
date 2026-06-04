import type { Service } from "~/types";

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Service`);

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
}

export async function createService(form: {
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  specialty: number;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Service`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to create service");
  }
}

export async function deleteService(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Service/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete service with ID ${id}`);
  }
}
