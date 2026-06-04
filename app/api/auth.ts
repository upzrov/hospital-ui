import type { Role } from "~/types/auth";

export async function signIn(form: { email: string; password: string }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    throw new Error("Неправильний email або пароль");
  }
}

export async function signUp(form: {
  name: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
  email: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    throw new Error("Неправильний email або пароль");
  }
}

export async function signOut() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-out`,
    { method: "POST", credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("Failed to sign out");
  }
}

export async function getRole(): Promise<Role> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/role`,
    { credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user role, user may be unathorized");
  }

  return (await response.text()) as Role;
}
