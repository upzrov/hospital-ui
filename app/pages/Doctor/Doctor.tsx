import "./Doctor.scss";

import { getDoctor, getSpecialties } from "~/api";
import type { Route } from "./+types/Doctor";

export async function clientLoader({ params }: Route.ComponentProps) {
  return Promise.all([getDoctor(Number(params.id)), getSpecialties()]);
}

export default function Doctor({ loaderData }: Route.ComponentProps) {
  const [doctor, specialties] = loaderData;

  const workStart = doctor.workStart ? doctor.workStart.slice(0, 5) : "—";
  const workEnd = doctor.workEnd ? doctor.workEnd.slice(0, 5) : "—";
  
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
                    <img src={doctor.photoUrl} alt={doctor.fullName}/>
                </div>

                <div className="doctor-detail-card__main">
                    <h1 className="doctor-detail-card__name">{doctor.fullName}</h1>

                    <div className="doctor-detail-card__specialty">
                        Спеціальність: {specialty?.name ?? "—"}
                    </div>

                    <div className="doctor-detail-card__email">
                        Email: {doctor.email}
                    </div>

                    <div className="doctor-detail-card__schedule">
                        Робочий час: <span>{workStart}</span> – <span>{workEnd}</span>
                    </div>
                </div>

                <div className="doctor-detail-card__services">
                    Записатися на:
                    {doctor.services?.length ? (
                        doctor.services.map(service => (
                                <button
                                    className="service"
                                    key={service.serviceId}
                                    onClick={() =>
                                        navigate(`/doctors/${doctor.doctorId}/${service.serviceId}`)
                                    }
                                >
                                    {service.name}
                                </button>
                            ))
                    ) : (
                        <div>Послуги не вказані</div>
                    )}
                </div>
            </div>
        </div>
    );
}
