import type { Service } from './service';

export interface Doctor {
  doctorId: number;
  fullName: string;
  specialty: number;
  email: string;
  photoUrl: string;
  gender: number;
  services: Service[];
  workEnd: string;
  workStart: string;
  isManaged?: boolean;
}
