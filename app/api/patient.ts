import type { Patient } from "~/types/patient";

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Patient`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return (await response.json()) as Patient[];
}

export async function deletePatient(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Patient/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete patient with ID ${id}`);
  }
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to update patient with ID ${id}`);
  }
}
