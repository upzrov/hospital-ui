import type { Appointment, AvailableSlot } from "~/types/appointment";
import { handleResponse } from "./utils";

export async function createAppointment(form: {
  startAt: string;
  doctorId: number;
  serviceId: number;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    },
  );

  return handleResponse(response);
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment`,
    { credentials: "include" },
  );

  return handleResponse(response);
}

export async function deleteAppointment(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  return handleResponse(response);
}

export async function getPatientAppointments(): Promise<Appointment[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/patient/appointments`,
    {
      credentials: "include",
    },
  );

  return handleResponse(response);
}

export async function getDoctorAppointments(): Promise<Appointment[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/doctor/appointments`,
    { credentials: "include" },
  );

  return handleResponse(response);
}

export async function getAvailableSlots(params: {
  doctorId: number;
  serviceId: number;
  date: Date;
}): Promise<AvailableSlot[]> {
  // URLSearchParams cleanly handles encoding the query parameters
  const queryParams = new URLSearchParams({
    doctorId: params.doctorId.toString(),
    serviceId: params.serviceId.toString(),
    date: params.date.toISOString(),
  });

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/available-slots?${queryParams.toString()}`,
    { credentials: "include" },
  );

  return handleResponse(response);
}
