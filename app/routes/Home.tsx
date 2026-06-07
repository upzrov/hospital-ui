import { NavLink, Link } from 'react-router';
import { getDoctors, getSpecialties } from '~/api';
import DoctorCard from '~/components/DoctorCard';
import '~/styles/routes/home.scss';
import type { Route } from './+types/home';

export async function loader() {
  const [doctors, specialties] = await Promise.all([
    getDoctors(),
    getSpecialties(),
  ]);
  return { doctors, specialties };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { doctors, specialties } = loaderData;

  return (
    <div className="home-page">
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
                <NavLink to={'/doctors'} className="btn btn-primary">
                  Записатися на прийом
                </NavLink>
                <NavLink to={'/services'} className="btn btn-outline">
                  Наші послуги
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-doctors">
        <div className="container">
          <h2 className="featured-doctors__title">Наші найкращі спеціалісти</h2>
          <div className="featured-doctors__grid">
            {doctors.slice(0, 3).map((doctor) => (
              <Link
                to={`/doctors/${doctor.doctorId}`}
                key={doctor.doctorId}
                className="featured-doctors__link"
              >
                <DoctorCard doctor={doctor} specialties={specialties} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
