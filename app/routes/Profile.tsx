import { Link } from 'react-router';
import {
  getAllAppointments,
  getDoctorAppointments,
  getDoctorProfile,
  getDoctors,
  getPatientAppointments,
  getPatientProfile,
  getRole,
  getServices,
  getSpecialties,
} from '~/api';
import { AppointmentsList } from '~/components/AppointmentsList';
import { Signout } from '~/components/Signout';
import '~/styles/routes/profile.scss';
import type { Appointment } from '~/types';
import type { Route } from './+types/profile';

export async function clientLoader() {
  const user = await getRole();

  const [doctors, services, specialties] = await Promise.all([
    getDoctors(),
    getServices(),
    getSpecialties(),
  ]);

  let patientProfile = null;
  let doctorProfile = null;
  let appointments = Array<Appointment>();

  if (user === 'Patient') {
    patientProfile = await getPatientProfile();
    appointments = await getPatientAppointments();
  } else if (user === 'Doctor') {
    doctorProfile = await getDoctorProfile();
    appointments = await getDoctorAppointments();
  } else if (user === 'Manager') {
    appointments = await getAllAppointments();
  } else if (user === 'Administrator') {
    appointments = await getAllAppointments();
  }

  return {
    user,
    patientProfile,
    doctorProfile,
    appointments,
    doctors,
    services,
    specialties,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA');
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const {
    user,
    patientProfile,
    doctorProfile,
    appointments,
    doctors,
    services,
    specialties,
  } = loaderData;

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1>Мій кабінет</h1>
        <Signout />
      </div>

      <section className="profile-info">
        <h2>Профіль</h2>

        {user === 'Patient' && patientProfile && (
          <div className="profile-info__card">
            <div>
              <strong>Ім'я:</strong> {patientProfile.fullName}
            </div>
            <div>
              <strong>Дата народження:</strong>{' '}
              {formatDate(patientProfile.dateOfBirth)}
            </div>
            <div>
              <strong>Телефон:</strong> {patientProfile.phoneNumber || '—'}
            </div>
          </div>
        )}

        {user === 'Patient' && !patientProfile && (
          <p className="profile-info__fallback">Пацієнт</p>
        )}

        {user === 'Doctor' && doctorProfile && (
          <div className="profile-info__card">
            <div>
              <strong>Ім'я:</strong> {doctorProfile.fullName}
            </div>
            <div>
              <strong>Email:</strong> {doctorProfile.email}
            </div>
            <div>
              <strong>Робочий час:</strong>{' '}
              {doctorProfile.workStart?.slice(0, 5)} –{' '}
              {doctorProfile.workEnd?.slice(0, 5)}
            </div>
          </div>
        )}

        {user === 'Doctor' && !doctorProfile && (
          <p className="profile-info__fallback">Лікар</p>
        )}

        {user === 'Manager' && (
          <div className="profile-info__card">
            <div>
              <strong>Роль:</strong> Менеджер
            </div>
            <div>Управління лікарями та послугами</div>
            <div className="profile-panel__actions profile-panel__actions--mt">
              <Link to="/patients">
                <button type="button">Управління пацієнтами</button>
              </Link>
            </div>
          </div>
        )}

        {user === 'Administrator' && (
          <div className="profile-info__card">
            <div>
              <strong>Роль:</strong> Адміністратор
            </div>
            <div>Управління менеджерами та перегляд усіх записів</div>
            <div className="profile-panel__actions profile-panel__actions--mt">
              <Link to="/patients">
                <button type="button">Управління пацієнтами</button>
              </Link>
              <Link to="/managers">
                <button type="button">Управління менеджерами</button>
              </Link>
            </div>
          </div>
        )}
      </section>

      <AppointmentsList
        user={user}
        appointments={appointments}
        doctors={doctors}
        services={services}
        specialties={specialties}
      />
    </div>
  );
}
