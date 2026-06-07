import type { Specialties, Gender } from '~/types/lookup';
import { handleResponse } from './utils';

export async function getSpecialties(): Promise<Specialties[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Lookup/specialties`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}

export async function getGenders(): Promise<Gender[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Lookup/genders`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}
