import { useState } from "react";
import { useRevalidator } from "react-router";
import { createManager } from "~/api";
import type { Manager } from "~/types/manager";

interface Props {
  managers: Manager[];
}

export function ManagerPanel({ managers }: Props) {
  const revalidator = useRevalidator();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createManager({
      fullName: form.fullName,
      phoneNumber: form.phoneNumber || null,
      email: form.email,
      password: form.password,
    });

    setForm({ fullName: "", phoneNumber: "", email: "", password: "" });
    revalidator.revalidate();
  };

  return (
    <section className="profile-panel">
      <h2>Управління менеджерами</h2>

      <form className="profile-panel__form" onSubmit={handleSubmit}>
        <h3>Додати менеджера</h3>

        <div className="profile-panel__fields">
          <input
            name="fullName"
            placeholder="Повне ім'я"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            name="phoneNumber"
            placeholder="Телефон"
            value={form.phoneNumber}
            onChange={handleChange}
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

        <button type="submit">Створити менеджера</button>
      </form>

      <div className="profile-panel__list">
        <h3>Список менеджерів</h3>

        {managers.length === 0 ? (
          <p>Менеджерів не знайдено</p>
        ) : (
          managers.map((manager) => (
            <div className="profile-panel__item" key={manager.managerId}>
              <div>
                <strong>{manager.fullName}</strong>
                <div>{manager.email}</div>
                {manager.phoneNumber && <div>{manager.phoneNumber}</div>}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
