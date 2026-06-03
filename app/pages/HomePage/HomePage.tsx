import "./HomePage.scss";

import DoctorCard from "~/components/DoctorCard/DoctorCard";
import { NavLink } from "react-router";
import type { Route } from "./+types/HomePage";
import { getDoctors } from "~/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Medical Center" },
    { name: "description", content: "Welcome to Medical Center!" },
  ];
}

export const loader = getDoctors;

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const doctors = loaderData;

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
                Сучасна медицина, професійні лікарі та турбота про кожного
                пацієнта. Ми поруч, коли це важливо.
              </p>

              <div className="hero-buttons">
                <NavLink to={"/doctors"} className="btn btn-primary">
                  Записатися на прийом
                </NavLink>
                <NavLink to={"/services"} className="btn btn-outline">
                  Наші послуги
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="doctorsList__main">
        <DoctorCard doctor={doctors.at(0)!} />
        <DoctorCard doctor={doctors.at(1)!} />
      </div>
    </div>
  );
}
