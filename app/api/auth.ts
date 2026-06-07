import type { Role } from '~/types/auth';
import { handleResponse } from './utils';

export async function signIn(form: { email: string; password: string }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-in`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form),
    },
  );

  return handleResponse(response);
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form),
    },
  );

  return handleResponse(response);
}

export async function signOut() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-out`,
    { method: 'POST', credentials: 'include' },
  );

  return handleResponse(response);
}

export async function getRole(): Promise<Role> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/role`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}
