import type { Appointment, AvailableSlot } from "~/types/appointment";

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

  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment`,
    { credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return (await response.json()) as Appointment[];
}

export async function deleteAppointment(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete appointment with ID ${id}`);
  }
}

export async function getPatientAppointments(): Promise<Appointment[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/patient/appointments`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch patient appointments");
  }

  return (await response.json()) as Appointment[];
}

export async function getDoctorAppointments(): Promise<Appointment[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Appointment/doctor/appointments`,
    { credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctor appointments");
  }

  return (await response.json()) as Appointment[];
}

// export async function getAvailableSlots(params: {
//   doctorId: number;
//   serviceId: number;
//   date: string;
// }): Promise<AvailableSlot[]> {
//   // URLSearchParams cleanly handles encoding the query parameters
//   const queryParams = new URLSearchParams({
//     doctorId: params.doctorId.toString(),
//     serviceId: params.serviceId.toString(),
//     date: params.date,
//   });
//
//   const response = await fetch(
//     `${import.meta.env.VITE_API_BASE_URL}/Appointment/available-slots?${queryParams.toString()}`,
//     { credentials: "include" },
//   );
//
//   if (!response.ok) {
//     throw new Error("Failed to fetch available slots");
//   }
//
//   return (await response.json()) as AvailableSlot[];
// }
