import { useState } from "react";
import { useRevalidator } from "react-router";
import {
  assignServiceToDoctor,
  createDoctor,
  deleteDoctor,
  updateDoctor,
} from "~/api";
import { ErrorNotification } from "~/components/ErrorNotification";
import { useError } from "~/hooks/useError";
import type { Gender, Service, Specialties } from "~/types";
import type { Doctor } from "~/types/doctor";

interface Props {
  doctors: Doctor[];
  services: Service[];
  specialties: Specialties[];
  genders: Gender[];
}

const emptyForm = {
  fullName: "",
  specialty: "",
  workStart: "09:00",
  workEnd: "17:00",
  email: "",
  password: "",
  gender: "",
};

export function DoctorPanel({
  doctors,
  services,
  specialties,
  genders,
}: Props) {
  const revalidator = useRevalidator();
  const [form, setForm] = useState(emptyForm);
  const [assignDoctorId, setAssignDoctorId] = useState("");
  const [assignServiceId, setAssignServiceId] = useState("");
  const { error, handleError, clearError } = useError();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цього лікаря?")) return;

    try {
      await deleteDoctor(id);
      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleAssign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assignDoctorId || !assignServiceId) return;

    try {
      await assignServiceToDoctor(
        Number(assignDoctorId),
        Number(assignServiceId),
      );
      setAssignDoctorId("");
      setAssignServiceId("");
      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleUpdateSchedule = async (doctor: Doctor) => {
    const workStart = prompt(
      "Початок робочого дня (HH:MM)",
      doctor.workStart?.slice(0, 5) ?? "09:00",
    );
    const workEnd = prompt(
      "Кінець робочого дня (HH:MM)",
      doctor.workEnd?.slice(0, 5) ?? "17:00",
    );

    if (!workStart || !workEnd) return;

    try {
      await updateDoctor(doctor.doctorId, {
        fullName: doctor.fullName,
        workStart,
        workEnd,
      });

      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const selectedDoctor = doctors.find(
    (d) => d.doctorId === Number(assignDoctorId),
  );
  const filteredServices = services.filter((s) => {
    if (!selectedDoctor) return true;
    return (
      s.specialty === selectedDoctor.specialty &&
      !selectedDoctor.services?.some((ds) => ds.serviceId === s.serviceId)
    );
  });

  return (
    <section className="profile-panel">
      <ErrorNotification message={error} onClose={clearError} />
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
            onChange={(e) => {
              setAssignDoctorId(e.target.value);
              setAssignServiceId("");
            }}
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
            disabled={!assignDoctorId}
          >
            <option value="">Послуга</option>
            {filteredServices.map((s) => (
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
            const specialty = specialties.find(
              (s) => s.id === doctor.specialty,
            );

            return (
              <div className="profile-panel__item" key={doctor.doctorId}>
                <div>
                  <strong>{doctor.fullName}</strong>
                  <div>{specialty?.name ?? "—"}</div>
                  <div>{doctor.email}</div>
                  <div>
                    {doctor.workStart?.slice(0, 5)} –{" "}
                    {doctor.workEnd?.slice(0, 5)}
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
