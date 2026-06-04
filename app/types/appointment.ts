export interface Appointment {
  appointmentId: number;
  startAt: string;
  endAt: string;
  doctorId: number;
  patientId: number;
  serviceId: number;
}

export interface AvailableSlot {
  startAt: string;
  endAt: string;
}
