import type { Service } from '~/types';
import type { Doctor } from '~/types/doctor';
import { handleResponse } from './utils';

export async function getDoctorProfile(): Promise<Doctor> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/me`,
    { credentials: 'include' },
  );

  return handleResponse(response);
}

export async function getDoctors(): Promise<Doctor[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Doctor`, {
    credentials: 'include',
  });

  return handleResponse(response);
}

export async function getDoctor(
  id: number,
): Promise<Doctor & { services: Service[] }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${id}`,
  );

  return handleResponse(response);
}

export async function createDoctor(form: {
  fullName: string;
  specialty: number;
  workStart: string;
  workEnd: string;
  email: string;
  password: string;
  gender: number;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Doctor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(form),
  });

  return handleResponse(response);
}

export async function assignServiceToDoctor(
  doctorId: number,
  serviceId: number,
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${doctorId}/services/${serviceId}`,
    {
      method: 'PUT',
      credentials: 'include',
    },
  );

  return handleResponse(response);
}

export async function deleteAssignedDoctorService(
  doctorId: number,
  serviceId: number,
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${doctorId}/services/${serviceId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  return handleResponse(response);
}

export async function deleteDoctor(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${id}`,
    { method: 'DELETE', credentials: 'include' },
  );

  return handleResponse(response);
}

export async function updateDoctor(
  id: number,
  form: {
    fullName: string;
    workStart: string;
    workEnd: string;
  },
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    },
  );

  return handleResponse(response);
}
