import type { Manager } from "~/types/manager";

export async function createManager(form: {
  fullName: string;
  phoneNumber: string | null;
  email: string;
  password: string;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Manager`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to create manager");
  }
}

export async function getManagers(): Promise<Manager[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Manager`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch managers");
  }

  return (await response.json()) as Manager[];
}
