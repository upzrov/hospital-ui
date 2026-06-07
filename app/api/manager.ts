import type { Manager } from "~/types/manager";
import { handleResponse } from "./utils";

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

  return handleResponse(response);
}

export async function getManagers(): Promise<Manager[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Manager`, {
    credentials: "include",
  });

  return handleResponse(response);
}

