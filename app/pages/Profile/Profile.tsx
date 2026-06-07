import "./Profile.scss";

import { Signout } from "~/components/Signout/Signout";
import { AppointmentsList } from "~/components/AppointmentsList/AppointmentsList";
import { ManagerPanel } from "./ManagerPanel";
import { DoctorPanel } from "./DoctorPanel";
import {
  getRole,
  getPatientProfile,
  getDoctorProfile,
  getPatientAppointments,
  getDoctorAppointments,
  getAllAppointments,
  getDoctors,
  getServices,
  getSpecialties,
  getGenders,
  getManagers,
} from "~/api";
import type { Route } from "./+types/Profile";
import type { Appointment, Doctor, Manager } from "~/types";

export async function clientLoader() {
  const user = await getRole();

  const [doctors, services, specialties, genders] = await Promise.all([
    getDoctors(),
    getServices(),
    getSpecialties(),
    getGenders(),
  ]);

  let patientProfile = null;
  let doctorProfile = null;
  let appointments = Array<Appointment>();
  let managedDoctors = Array<Doctor>();
  let managers = Array<Manager>();

  if (user === "Patient") {
    patientProfile = await getPatientProfile();
    appointments = await getPatientAppointments();
  } else if (user === "Doctor") {
    doctorProfile = await getDoctorProfile();
    appointments = await getDoctorAppointments();
  } else if (user === "Manager") {
    appointments = await getAllAppointments();
    managedDoctors = doctors;
  } else if (user === "Administrator") {
    appointments = await getAllAppointments();
    managers = await getManagers();
  }

  return {
    user,
    patientProfile,
    doctorProfile,
    appointments,
    doctors,
    services,
    specialties,
    genders,
    managedDoctors,
    managers,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uk-UA");
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  const {
    user,
    patientProfile,
    doctorProfile,
    appointments,
    doctors,
    services,
    specialties,
    genders,
    managedDoctors,
    managers,
  } = loaderData;

  // const doctorSpecialty = specialties.find(
  //   (s) => s.id === doctorProfile?.specialty,
  // );

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1>Мій кабінет</h1>
        <Signout />
      </div>

      <section className="profile-info">
        <h2>Профіль</h2>

        {user === "Patient" && patientProfile && (
          <div className="profile-info__card">
            <div>
              <strong>Ім'я:</strong> {patientProfile.fullName}
            </div>
            <div>
              <strong>Дата народження:</strong>{" "}
              {formatDate(patientProfile.dateOfBirth)}
            </div>
            <div>
              <strong>Телефон:</strong> {patientProfile.phoneNumber || "—"}
            </div>
          </div>
        )}

        {user === "Patient" && !patientProfile && (
          <p className="profile-info__fallback">Пацієнт</p>
        )}

        {user === "Doctor" && doctorProfile && (
          <div className="profile-info__card">
            <div>
              <strong>Ім'я:</strong> {doctorProfile.fullName}
            </div>
            <div>
              <strong>Email:</strong> {doctorProfile.email}
            </div>
            <div>
              <strong>Робочий час:</strong>{" "}
              {doctorProfile.workStart?.slice(0, 5)} –{" "}
              {doctorProfile.workEnd?.slice(0, 5)}
            </div>
          </div>
        )}

        {user === "Doctor" && !doctorProfile && (
          <p className="profile-info__fallback">Лікар</p>
        )}

        {user === "Manager" && (
          <div className="profile-info__card">
            <div>
              <strong>Роль:</strong> Менеджер
            </div>
            <div>Управління лікарями та послугами</div>
          </div>
        )}

        {user === "Administrator" && (
          <div className="profile-info__card">
            <div>
              <strong>Роль:</strong> Адміністратор
            </div>
            <div>Управління менеджерами та перегляд усіх записів</div>
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

      {user === "Administrator" && <ManagerPanel managers={managers} />}

      {user === "Manager" && (
        <DoctorPanel
          doctors={managedDoctors}
          services={services}
          specialties={specialties}
          genders={genders}
        />
      )}
    </div>
  );
}
