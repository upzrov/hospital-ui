import "./Service.scss";

import { getDoctors, getService, getSpecialties } from "~/api";
import DoctorCard from "~/components/DoctorCard/DoctorCard";
import type { Route } from "./+types/Service";

export async function clientLoader({ params }: Route.ComponentProps) {
  return Promise.all([
    getService(Number(params.id)),
    getDoctors(),
    getSpecialties(),
  ]);
}

export default function Service({ loaderData }: Route.ComponentProps) {
  const [service, doctors, specialties] = loaderData;

  if (!service) {
    return (
      <div className="service-page-card">
        <h2>Послугу не знайдено</h2>
      </div>
    );
  }

  const specialty = specialties.find((sp) => sp.id === service.specialty);

  const availableDoctors = doctors.filter(
    (doctor) =>
      doctor.services?.some((s) => s.serviceId === service.serviceId) ||
      doctor.specialty === service.specialty,
  );

  return (
    <div className="service-page">
      <div className="service-page-card">
        <h1 className="service-page-card__name">{service.name}</h1>

        <div className="service-page-card__description">
          {service.description}
        </div>

        <div className="service-page-card__price">Ціна: ${service.price}</div>

        <div className="service-page-card__duration">
          Тривалість: {service.durationMinutes} хв
        </div>

        <div className="service-page-card__specialty">
          Спеціальність: {specialty?.name ?? "—"}
        </div>
      </div>

      <section className="service-page__doctors">
        <h2>Оберіть лікаря</h2>

        {availableDoctors.length ? (
          <div className="service-page__doctors-list">
            {availableDoctors.map((doctor) => (
              <DoctorCard
                doctor={doctor}
                specialties={specialties}
                bookTo={`/services/${service.serviceId}/${doctor.doctorId}`}
                requireRole="Patient"
                key={doctor.doctorId}
              />
            ))}
          </div>
        ) : (
          <p>Лікарів не знайдено</p>
        )}
      </section>
    </div>
  );
}
