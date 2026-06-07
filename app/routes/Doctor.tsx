import { useState } from "react";
import { useNavigate, useOutletContext, useRevalidator } from "react-router";
import {
  assignServiceToDoctor,
  deleteAssignedDoctorService,
  getDoctor,
  getServices,
  getSpecialties,
} from "~/api";
import { ErrorNotification } from "~/components/ErrorNotification";
import { useError } from "~/hooks/useError";
import "~/styles/routes/Doctor.scss";
import type { Role } from "~/types/auth";
import type { Route } from "./+types/Doctor";

export async function loader({ params }: Route.ComponentProps) {
  return Promise.all([
    getDoctor(Number(params.id)),
    getSpecialties(),
    getServices(),
  ]);
}

export default function Doctor({ loaderData }: Route.ComponentProps) {
  const [doctor, specialties, allServices] = loaderData;
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { user } = useOutletContext<{ user: Role | null }>();
  const { error, handleError, clearError } = useError();

  const [selectedServiceId, setSelectedServiceId] = useState("");

  if (!doctor) {
    return (
      <div className="doctor-detail-card">
        <h2>Лікаря не знайдено</h2>
      </div>
    );
  }

  const handleAssign = async () => {
    if (!selectedServiceId) return;
    try {
      await assignServiceToDoctor(doctor.doctorId, Number(selectedServiceId));
      setSelectedServiceId("");
      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleRemove = async (serviceId: number) => {
    if (!confirm("Видалити цю послугу у лікаря?")) return;
    try {
      await deleteAssignedDoctorService(doctor.doctorId, serviceId);
      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const specialty = specialties.find((sp) => sp.id === doctor.specialty);

  const workStart = doctor.workStart ? doctor.workStart.slice(0, 5) : "—";
  const workEnd = doctor.workEnd ? doctor.workEnd.slice(0, 5) : "—";

  const availableServices = allServices.filter(
    (s) =>
      s.specialty === doctor.specialty &&
      !doctor.services?.some((ds) => ds.serviceId === s.serviceId),
  );

  return (
    <div className="doctor-page">
      <ErrorNotification message={error} onClose={clearError} />

      <div className="doctor-page-card">
        <div className="doctor-page-card__top">
          <div className="doctor-page-card__image">
            <img src={doctor.photoUrl} alt={doctor.fullName} />
          </div>

          <div className="doctor-page-card__main">
            <h1 className="doctor-page-card__name">{doctor.fullName}</h1>

            <div className="doctor-page-card__specialty">
              Спеціальність: {specialty?.name ?? "—"}
            </div>

            <div className="doctor-page-card__email">Email: {doctor.email}</div>

            <div className="doctor-page-card__schedule">
              Робочий час: <span>{workStart}</span> – <span>{workEnd}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="doctor-page__services">
        <h2>{user === "Manager" ? "Управління послугами" : "Записатися на:"}</h2>

        <div className="doctor-page__services-list">
          {doctor.services?.length ? (
            doctor.services.map((service) => (
              <div key={service.serviceId} className="service-item-wrapper">
                <button
                  className="service-btn"
                  onClick={() => {
                    if (!user) {
                      navigate("/signin");
                      return;
                    }
                    if (user === "Manager") return;
                    navigate(
                      `/doctors/${doctor.doctorId}/${service.serviceId}`,
                    );
                  }}
                  disabled={user === "Manager"}
                >
                  <span className="service-name">{service.name}</span>
                  <span className="service-price">${service.price}</span>
                </button>
                {user === "Manager" && (
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(service.serviceId)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="no-services">Послуги не вказані</p>
          )}
        </div>

        {user === "Manager" && availableServices.length > 0 && (
          <div className="doctor-page__management">
            <h3>Призначити нову послугу</h3>
            <div className="management-controls">
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                <option value="">Оберіть послугу</option>
                {availableServices.map((s) => (
                  <option key={s.serviceId} value={s.serviceId}>
                    {s.name} (${s.price})
                  </option>
                ))}
              </select>
              <button
                className="assign-btn"
                onClick={handleAssign}
                disabled={!selectedServiceId}
              >
                Призначити
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
