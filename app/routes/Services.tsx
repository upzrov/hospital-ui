import { useState } from 'react';
import { useOutletContext, useRevalidator } from 'react-router';
import {
  createService,
  deleteService,
  getDoctors,
  getServices,
  getSpecialties,
} from '~/api';
import { ServiceCard } from '~/components/ServiceCard';
import '~/styles/routes/Services.scss';
import type { Role } from '~/types/auth';
import type { Route } from './+types/Services';

export async function loader() {
  return Promise.all([getDoctors(), getServices(), getSpecialties()]);
}

export default function Services({ loaderData }: Route.ComponentProps) {
  const [doctors, services, specialties] = loaderData;
  const { user } = useOutletContext<{ user: Role | null }>();
  const revalidator = useRevalidator();

  const canManage = user === 'Manager';

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    durationMinutes: '',
    specialty: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createService({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      durationMinutes: Number(form.durationMinutes),
      specialty: Number(form.specialty),
    });

    setForm({
      name: '',
      description: '',
      price: '',
      durationMinutes: '',
      specialty: '',
    });

    revalidator.revalidate();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Видалити цю послугу?')) return;

    await deleteService(id);
    revalidator.revalidate();
  };

  return (
    <div className="services-page">
      <h1 className="services-page__title">Наші послуги</h1>

      {canManage && (
        <form className="services-page__form" onSubmit={handleCreate}>
          <h2>Додати послугу</h2>

          <div className="services-page__fields">
            <input
              name="name"
              placeholder="Назва"
              value={form.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Опис"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Ціна"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="durationMinutes"
              type="number"
              placeholder="Тривалість (хв)"
              value={form.durationMinutes}
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
          </div>

          <button type="submit">Створити послугу</button>
        </form>
      )}

      <div className="servicesList">
        {services.map((service) => (
          <ServiceCard
            service={service}
            doctors={doctors}
            canManage={canManage}
            onDelete={handleDelete}
            key={service.serviceId}
          />
        ))}
      </div>
    </div>
  );
}
