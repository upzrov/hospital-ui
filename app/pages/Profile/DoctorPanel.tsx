import {
  assignServiceToDoctor,
  createDoctor,
  deleteDoctor,
  updateDoctor,
} from "~/api";
import type { Doctor } from "~/types/doctor";
import type { Gender, Service, Specialties } from "~/types";
import { useRevalidator } from "react-router";
import { useState } from "react";

type Props = {
  doctors: Doctor[];
  services: Service[];
  specialties: Specialties[];
  genders: Gender[];
};

const emptyForm = {
  fullName: "",
  specialty: "",
  workStart: "09:00",
  workEnd: "17:00",
  email: "",
  password: "",
  gender: "",
};

export function DoctorPanel({ doctors, services, specialties, genders }: Props) {
  const revalidator = useRevalidator();
  const [form, setForm] = useState(emptyForm);
  const [assignDoctorId, setAssignDoctorId] = useState("");
  const [assignServiceId, setAssignServiceId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createDoctor({
      fullName: form.fullName,
      specialty: Number(form.specialty),
      workStart: form.workStart,
      workEnd: form.workEnd,
      email: form.email,
      password: form.password,
      gender: Number(form.gender),
    });

    setForm(emptyForm);
    revalidator.revalidate();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цього лікаря?")) return;

    await deleteDoctor(id);
    revalidator.revalidate();
  };

  const handleAssign = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assignDoctorId || !assignServiceId) return;

    await assignServiceToDoctor(Number(assignDoctorId), Number(assignServiceId));
    revalidator.revalidate();
  };

  const handleUpdateSchedule = async (doctor: Doctor) => {
    const workStart = prompt("Початок робочого дня (HH:MM)", doctor.workStart?.slice(0, 5) ?? "09:00");
    const workEnd = prompt("Кінець робочого дня (HH:MM)", doctor.workEnd?.slice(0, 5) ?? "17:00");

    if (!workStart || !workEnd) return;

    await updateDoctor(doctor.doctorId, {
      fullName: doctor.fullName,
      workStart,
      workEnd,
    });

    revalidator.revalidate();
  };

  return (
    <section className="profile-panel">
      <h2>Управління лікарями</h2>

      <form className="profile-panel__form" onSubmit={handleCreate}>
        <h3>Додати лікаря</h3>

        <div className="profile-panel__fields">
          <input
            name="fullName"
            placeholder="Повне ім'я"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <select
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
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
            value={form.gender}
            onChange={handleChange}
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
            value={form.workStart}
            onChange={handleChange}
            required
          />
          <input
            name="workEnd"
            type="time"
            value={form.workEnd}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Створити лікаря</button>
      </form>

      <form className="profile-panel__form" onSubmit={handleAssign}>
        <h3>Призначити послугу лікарю</h3>

        <div className="profile-panel__fields">
          <select
            value={assignDoctorId}
            onChange={(e) => setAssignDoctorId(e.target.value)}
            required
          >
            <option value="">Лікар</option>
            {doctors.map((d) => (
              <option key={d.doctorId} value={d.doctorId}>
                {d.fullName}
              </option>
            ))}
          </select>
          <select
            value={assignServiceId}
            onChange={(e) => setAssignServiceId(e.target.value)}
            required
          >
            <option value="">Послуга</option>
            {services.map((s) => (
              <option key={s.serviceId} value={s.serviceId}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Призначити</button>
      </form>

      <div className="profile-panel__list">
        <h3>Список лікарів</h3>

        {doctors.length === 0 ? (
          <p>Лікарів не знайдено</p>
        ) : (
          doctors.map((doctor) => {
            const specialty = specialties.find((s) => s.id === doctor.specialty);

            return (
              <div className="profile-panel__item" key={doctor.doctorId}>
                <div>
                  <strong>{doctor.fullName}</strong>
                  <div>{specialty?.name ?? "—"}</div>
                  <div>{doctor.email}</div>
                  <div>
                    {doctor.workStart?.slice(0, 5)} – {doctor.workEnd?.slice(0, 5)}
                  </div>
                </div>

                <div className="profile-panel__actions">
                  <button
                    type="button"
                    onClick={() => handleUpdateSchedule(doctor)}
                  >
                    Графік
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(doctor.doctorId)}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
