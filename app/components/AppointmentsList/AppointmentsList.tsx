import "./AppointmentsList.scss";

import { deleteAppointment } from "~/api";
import type { Appointment } from "~/types/appointment";
import type { Doctor } from "~/types/doctor";
import type { Role } from "~/types/auth";
import type { Service } from "~/types/service";
import type { Specialties } from "~/types/lookup";
import { useRevalidator } from "react-router";

type Props = {
  user: Role;
  appointments: Appointment[];
  doctors: Doctor[];
  services: Service[];
  specialties: Specialties[];
};

function formatDateTime(iso: string) {
  const date = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}

export function AppointmentsList({
  user,
  appointments,
  doctors,
  services,
  specialties,
}: Props) {
  const revalidator = useRevalidator();

  const canDelete = user === "Patient" || user === "Manager";

  const pageTitle =
    user === "Administrator" || user === "Manager"
      ? "Усі записи"
      : user === "Doctor"
        ? "Мої прийоми"
        : "Мої записи";

  const handleDelete = async (id: number) => {
    if (!confirm("Скасувати цей запис?")) return;

    await deleteAppointment(id);
    revalidator.revalidate();
  };

  return (
    <section className="appointments-section">
      <h2>{pageTitle}</h2>

      {appointments.length === 0 ? (
        <p className="appointments-section__empty">Записів не знайдено</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => {
            const doctor = doctors.find(
              (d) => d.doctorId === appointment.doctorId,
            );
            const service = services.find(
              (s) => s.serviceId === appointment.serviceId,
            );
            const specialty = specialties.find(
              (sp) => sp.id === service?.specialty,
            );

            return (
              <div
                className="appointment-card"
                key={appointment.appointmentId}
              >
                <div className="appointment-card__main">
                  <div className="appointment-card__service">
                    {service?.name ?? `Послуга #${appointment.serviceId}`}
                  </div>

                  <div className="appointment-card__doctor">
                    Лікар: {doctor?.fullName ?? `#${appointment.doctorId}`}
                  </div>

                  {specialty && (
                    <div className="appointment-card__specialty">
                      Спеціальність: {specialty.name}
                    </div>
                  )}

                  <div className="appointment-card__time">
                    {formatDateTime(appointment.startAt)} –{" "}
                    {formatDateTime(appointment.endAt)}
                  </div>

                  {(user === "Administrator" || user === "Manager") && (
                    <div className="appointment-card__patient">
                      Пацієнт ID: {appointment.patientId}
                    </div>
                  )}
                </div>

                {canDelete && (
                  <button
                    className="appointment-card__delete"
                    onClick={() => handleDelete(appointment.appointmentId)}
                  >
                    Скасувати
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
