import { useState, useRef } from 'react';
import { useRevalidator, redirect } from 'react-router';
import {
  createManager,
  deleteManager,
  getManagers,
  getRole,
  updateManager,
} from '~/api';
import { Modal } from '~/components/Modal';
import { useModal } from '~/hooks/useModal';
import '~/styles/routes/managers.scss';
import type { Manager } from '~/types/manager';
import type { Route } from './+types/managers';

export async function clientLoader() {
  try {
    const user = await getRole();
    if (user !== 'Administrator') {
      return redirect('/signin');
    }
  } catch (err) {
    return redirect('/signin');
  }

  const managers = await getManagers();
  return { managers };
}

export default function Managers({ loaderData }: Route.ComponentProps) {
  const { managers } = loaderData;
  const revalidator = useRevalidator();
  const scrollRef = useRef<HTMLHeadingElement>(null);
  const { modalConfig, showModal, handleClose } = useModal();

  const [editingManager, setEditingManager] = useState<Manager | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (manager: Manager) => {
    setEditingManager(manager);
    setForm({
      fullName: manager.fullName,
      phoneNumber: manager.phoneNumber || '',
      email: manager.email,
      password: '', // Password not needed for update
    });

    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleCancel = () => {
    setEditingManager(null);
    setForm({ fullName: '', phoneNumber: '', email: '', password: '' });
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showModal({
      title: 'Підтвердження',
      message: 'Ви впевнені, що хочете видалити цього менеджера?',
      type: 'confirm',
    });

    if (confirmed) {
      await deleteManager(id);
      revalidator.revalidate();
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingManager) {
      await updateManager(editingManager.managerId, {
        fullName: form.fullName,
        phoneNumber: form.phoneNumber || null,
        email: form.email,
      });
      setEditingManager(null);
    } else {
      await createManager({
        fullName: form.fullName,
        phoneNumber: form.phoneNumber || null,
        email: form.email,
        password: form.password,
      });
    }

    setForm({ fullName: '', phoneNumber: '', email: '', password: '' });
    revalidator.revalidate();
  };

  return (
    <div className="managers-page">
      {modalConfig && (
        <Modal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          onClose={handleClose}
        />
      )}
      <div className="managers-page__header">
        <h1 ref={scrollRef}>Управління менеджерами</h1>
      </div>

      <section className="profile-panel">
        <h2>{editingManager ? 'Редагувати менеджера' : 'Додати менеджера'}</h2>
        <form className="profile-panel__form" onSubmit={handleSubmit}>
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
            {!editingManager && (
              <input
                name="password"
                type="password"
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange}
                required
              />
            )}
          </div>
          <div className="profile-panel__actions">
            <button type="submit">
              {editingManager ? 'Зберегти зміни' : 'Створити менеджера'}
            </button>
            {editingManager && (
              <button type="button" className="danger" onClick={handleCancel}>
                Скасувати
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="profile-panel">
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
                <div className="profile-panel__actions">
                  <button onClick={() => handleEdit(manager)}>
                    Редагувати
                  </button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(manager.managerId)}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
