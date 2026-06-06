import type { Service, Specialties } from "~/types";
import type { Doctor } from "~/types/doctor";

export async function getDoctors(): Promise<Doctor[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Doctor`);

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
}

export async function getDoctor(
  id: number,
): Promise<Doctor & { services: Service[] }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${id}`,
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Failed to fetch doctor");
  }

  return response.json();
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to create doctor");
  }
}

export async function assignServiceToDoctor(
  doctorId: number,
  serviceId: number,
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${doctorId}/services/${serviceId}`,
    {
      method: "PUT",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to assign service ${serviceId} to doctor ${doctorId}`,
    );
  }
}

export async function deleteDoctor(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Doctor/${id}`,
    { method: "DELETE", credentials: "include" },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete doctor with ID ${id}`);
  }
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to update doctor with ID ${id}`);
  }
}
