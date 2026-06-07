import type { Patient } from '~/types/patient';
import { handleResponse } from './utils';

export async function getPatientProfile(): Promise<Patient> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Patient/me`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Patient`, {
    credentials: 'include',
  });

  return handleResponse(response);
}

export async function getPatientById(id: number): Promise<Patient> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Patient/${id}`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}

export async function deletePatient(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Patient/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  return handleResponse(response);
}

export async function updatePatient(
  id: number,
  form: {
    fullName: string;
    dateOfBirth: string;
    phoneNumber: string | null;
  },
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Patient/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    },
  );

  return handleResponse(response);
}
