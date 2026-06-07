import { useState, useRef } from 'react';
import { useRevalidator } from 'react-router';
import { deletePatient, getPatients, getRole, updatePatient } from '~/api';
import '~/styles/routes/patients.scss';
import type { Patient } from '~/types/patient';
import type { Route } from './+types/patients';
import { Modal } from '~/components/Modal';
import { useModal } from '~/hooks/useModal';

export async function clientLoader() {
  const user = await getRole();
  if (user !== 'Administrator' && user !== 'Manager') {
    throw new Response('Forbidden', { status: 403 });
  }

  const patients = await getPatients();
  return { patients };
}

export default function Patients({ loaderData }: Route.ComponentProps) {
  const { patients } = loaderData;
  const revalidator = useRevalidator();
  const scrollRef = useRef<HTMLHeadingElement>(null);
  const { modalConfig, showModal, handleClose } = useModal();
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
  });

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setForm({
      fullName: patient.fullName,
      dateOfBirth: patient.dateOfBirth.split('T')[0],
      phoneNumber: patient.phoneNumber || '',
    });

    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleCancel = () => {
    setEditingPatient(null);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showModal({
      title: 'Підтвердження',
      message: 'Ви впевнені, що хочете видалити цього пацієнта?',
      type: 'confirm',
    });

    if (confirmed) {
      await deletePatient(id);
      revalidator.revalidate();
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!editingPatient) return;

    await updatePatient(editingPatient.patientId, {
      fullName: form.fullName,
      dateOfBirth: form.dateOfBirth,
      phoneNumber: form.phoneNumber || null,
    });

    setEditingPatient(null);
    revalidator.revalidate();
  };

  return (
    <div className="patients-page">
      {modalConfig && (
        <Modal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          defaultValue={modalConfig.defaultValue}
          onClose={handleClose}
        />
      )}
      <div className="patients-page__header">
        <h1 ref={scrollRef}>Управління пацієнтами</h1>
      </div>

      {editingPatient && (
        <section className="profile-panel">
          <h2>Редагувати пацієнта</h2>
          <form className="profile-panel__form" onSubmit={handleSubmit}>
            <div className="profile-panel__fields">
              <input
                placeholder="Повне ім'я"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm({ ...form, dateOfBirth: e.target.value })
                }
                required
              />
              <input
                placeholder="Телефон"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="profile-panel__actions">
              <button type="submit">Зберегти</button>
              <button type="button" className="danger" onClick={handleCancel}>
                Скасувати
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="profile-panel">
        <div className="profile-panel__list">
          <h3>Список пацієнтів</h3>
          {patients.length === 0 ? (
            <p>Пацієнтів не знайдено</p>
          ) : (
            patients.map((patient) => (
              <div className="profile-panel__item" key={patient.patientId}>
                <div>
                  <strong>{patient.fullName}</strong>
                  <div>
                    Дата народження:{' '}
                    {new Date(patient.dateOfBirth).toLocaleDateString('uk-UA')}
                  </div>
                  {patient.phoneNumber && (
                    <div>Телефон: {patient.phoneNumber}</div>
                  )}
                </div>
                <div className="profile-panel__actions">
                  <button onClick={() => handleEdit(patient)}>
                    Редагувати
                  </button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(patient.patientId)}
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
