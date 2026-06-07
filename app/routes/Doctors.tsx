import { useState } from "react";
import { useOutletContext, useRevalidator } from "react-router";
import {
  createDoctor,
  getDoctors,
  getGenders,
  getServices,
  getSpecialties,
} from "~/api";
import DoctorCard from "~/components/DoctorCard";
import "~/styles/routes/Doctors.scss";
import type { Role } from "~/types/auth";
import type { Route } from "./+types/Doctors";

export async function clientLoader() {
  const [doctors, services, specialties, genders] = await Promise.all([
    getDoctors(),
    getServices(),
    getSpecialties(),
    getGenders(),
  ]);
  return { doctors, services, specialties, genders };
}

export default function Doctors({ loaderData }: Route.ComponentProps) {
  const { doctors, services, specialties, genders } = loaderData;
  const { user } = useOutletContext<{ user: Role | null }>();
  const revalidator = useRevalidator();

  const [doctorForm, setDoctorForm] = useState({
    fullName: "",
    specialty: "",
    workStart: "09:00",
    workEnd: "17:00",
    email: "",
    password: "",
    gender: "",
  });

  const handleDoctorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDoctor({
      fullName: doctorForm.fullName,
      specialty: Number(doctorForm.specialty),
      workStart: doctorForm.workStart,
      workEnd: doctorForm.workEnd,
      email: doctorForm.email,
      password: doctorForm.password,
      gender: Number(doctorForm.gender),
    });
    setDoctorForm({
      fullName: "",
      specialty: "",
      workStart: "09:00",
      workEnd: "17:00",
      email: "",
      password: "",
      gender: "",
    });
    revalidator.revalidate();
  };

  return (
    <div className="doctors-page">
      <h1 className="doctors-page__title">Наші лікарі</h1>

      {user === "Manager" && (
        <form className="doctors-page__form" onSubmit={handleCreateDoctor}>
          <h2>Додати лікаря</h2>
          <div className="doctors-page__fields">
            <input
              name="fullName"
              placeholder="Повне ім'я"
              value={doctorForm.fullName}
              onChange={handleDoctorChange}
              required
            />
            <select
              name="specialty"
              value={doctorForm.specialty}
              onChange={handleDoctorChange}
              required
            >
              <option value="">Спеціальність</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              name="gender"
              value={doctorForm.gender}
              onChange={handleDoctorChange}
              required
            >
              <option value="">Стать</option>
              {genders.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <input
              name="workStart"
              type="time"
              value={doctorForm.workStart}
              onChange={handleDoctorChange}
              required
            />
            <input
              name="workEnd"
              type="time"
              value={doctorForm.workEnd}
              onChange={handleDoctorChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={doctorForm.email}
              onChange={handleDoctorChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              value={doctorForm.password}
              onChange={handleDoctorChange}
              required
            />
          </div>
          <button type="submit">Створити лікаря</button>
        </form>
      )}

      <div className="doctorsList">
        {doctors.map((doctor) => (
          <DoctorCard
            doctor={doctor}
            specialties={specialties}
            key={doctor.doctorId}
            isManaged={user === "Manager"}
          />
        ))}
      </div>
    </div>
  );
}
