import type { Service } from '~/types';
import { handleResponse } from './utils';

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Service`, {
    credentials: 'include',
  });

  return handleResponse(response);
}

export async function getService(id: number): Promise<Service> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Service/${id}`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}

export async function createService(form: {
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  specialty: number;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Service`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(form),
  });

  return handleResponse(response);
}

export async function deleteService(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Service/${id}`,
    { method: 'DELETE', credentials: 'include' },
  );

  return handleResponse(response);
}
