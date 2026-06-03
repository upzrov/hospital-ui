import "./DoctorsPage.scss";

import { getDoctors, getServices, getSpecialties } from "~/api";
import DoctorCard from "~/components/DoctorCard/DoctorCard";
import type { Route } from "./+types/DoctorsPage";

export async function loader() {
  return Promise.all([getDoctors(), getServices(), getSpecialties()]);
}

export default function DoctorsPage({ loaderData }: Route.ComponentProps) {
  const [doctors, services, specialties] = loaderData;

  return (
    <div>
      <h1>Doctors Page</h1>

      <div className="doctorsList">
        {doctors.map((doctor) => (
          <DoctorCard
            doctor={doctor}
            services={services}
            specialties={specialties}
            key={doctor.doctorId}
          />
        ))}
      </div>
    </div>
  );
}
