import "./DoctorService.scss";

import type { Route } from "./+types/DoctorService";

import { getAvailableSlots, getDoctor, getSpecialties } from "~/api";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const doctorId = Number(params.doctorId);
  const serviceId = Number(params.serviceId);

  const date = new Date();
  date.setDate(date.getDate() + 1);

  return Promise.all([
    getDoctor(doctorId),
    getSpecialties(),
    getAvailableSlots({
      doctorId,
      serviceId,
      date,
    }),
  ]);
}

export default function DoctorService({
  params,
  loaderData,
}: Route.ComponentProps) {
  const [doctor, specialties, slots] = loaderData;

  if (!doctor) {
    return (
      <div className="doctor-detail-card">
        <h2>Лікаря не знайдено</h2>
      </div>
    );
  }

  const specialty = specialties.find((sp) => sp.id === doctor.specialty);
  const workStart = doctor.workStart ? doctor.workStart.slice(0, 5) : "—";
  const workEnd = doctor.workEnd ? doctor.workEnd.slice(0, 5) : "—";

  return (
    <div className="doctor-detail-card">
      <div className="doctor-detail-card__top">
        <div className="doctor-detail-card__image">
          <img src={doctor.photoUrl} alt={doctor.fullName} />
        </div>

        <div className="doctor-detail-card__main">
          <h1 className="doctor-detail-card__name">{doctor.fullName}</h1>

          <div className="doctor-detail-card__specialty">
            Спеціальність: {specialty?.name ?? "—"}
          </div>

          <div className="doctor-detail-card__email">Email: {doctor.email}</div>

          <div className="doctor-detail-card__schedule">
            Робочий час: <span>{workStart}</span> – <span>{workEnd}</span>
          </div>
        </div>
      </div>

      <div className="doctor-detail-card__bottom">
        <div className="doctor-detail-card__services">
          {doctor.services?.length ? (
            doctor.services.map((s, index) => (
              <div className="service" key={index}>
                {s.name}
              </div>
            ))
          ) : (
            <div>Послуги не вказані</div>
          )}
        </div>

        {/* TODO: Render slots somewhere here */}
      </div>
    </div>
  );
}
