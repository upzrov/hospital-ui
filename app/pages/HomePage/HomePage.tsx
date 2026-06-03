import './HomePage.scss'

import type { Route } from "../../../.react-router/types/app/routes/+types";
import DoctorCard from "~/components/DoctorCard/DoctorCard";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";

import { getDoctors } from "~/api/doctor";
import { getServices } from "~/api/service";
import { getSpecialties } from "~/api/specialties";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function HomePage() {

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [specialties, setSpecialties] = useState<Specialties[]>([]);

    useEffect(() => {
        getDoctors()
            .then(data => setDoctors(data))
            .catch(e => console.error(e));

        getServices()
            .then(data => setServices(data))
            .catch(e => console.error(e));

        getSpecialties()
            .then(data => setSpecialties(data))
            .catch(e => console.error(e));
    }, []);

    return (
        <div className="content">

            <section className="hero">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-content--text">
                                Тут починається ваше здоров'я
                            </div>

                            <p>
                                Сучасна медицина, професійні лікарі та турбота про кожного пацієнта.
                                Ми поруч, коли це важливо.
                            </p>

                            <div className="hero-buttons">
                                <NavLink to="/doctors" className="btn btn-primary">
                                    Записатися на прийом
                                </NavLink>
                                <NavLink to="/services" className="btn btn-outline">
                                    Наші послуги
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="doctorsList__main">
                {doctors.map((doctor) => (
                    <DoctorCard
                        doctor={doctor}
                        services={services}
                        specialties={specialties}
                    />
                ))}
            </div>

        </div>
    );
}