import '~/styles/components/DoctorCard.scss';

import React from 'react';
import type { Doctor, Role, Specialties } from '~/types';
import { useNavigate, useOutletContext, useRevalidator } from 'react-router';
import { deleteDoctor, updateDoctor } from '~/api';
import { useError } from '~/hooks/useError';
import { ErrorNotification } from './ErrorNotification';
import { Modal } from '~/components/Modal';
import { useModal } from '~/hooks/useModal';

interface Props {
  doctor: Doctor;
  specialties?: Specialties[];
  bookTo?: string;
  isManaged?: boolean;
}

export const DoctorCard: React.FC<Props> = ({
  doctor,
  specialties = [],
  bookTo,
  isManaged = false,
}) => {
  const specialty = specialties?.find(
    (s: Specialties) => s.id === doctor.specialty,
  );

  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { user } = useOutletContext<{ user: Role | null }>();
  const { error, handleError, clearError } = useError();
  const { modalConfig, showModal, handleClose } = useModal();

  const handleDelete = async () => {
    const confirmed = await showModal({
      title: 'Підтвердження',
      message: `Видалити лікаря ${doctor.fullName}?`,
      type: 'confirm',
    });

    if (!confirmed) return;

    try {
      await deleteDoctor(doctor.doctorId);
      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleUpdateSchedule = async () => {
    const workStart = await showModal({
      title: 'Графік',
      message: 'Початок робочого дня (HH:MM)',
      type: 'prompt',
      defaultValue: doctor.workStart?.slice(0, 5) ?? '09:00',
    });

    if (workStart === null) return;

    const workEnd = await showModal({
      title: 'Графік',
      message: 'Кінець робочого дня (HH:MM)',
      type: 'prompt',
      defaultValue: doctor.workEnd?.slice(0, 5) ?? '17:00',
    });

    if (workEnd === null) return;

    try {
      await updateDoctor(doctor.doctorId, {
        fullName: doctor.fullName,
        workStart: String(workStart),
        workEnd: String(workEnd),
      });

      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="doctor-card">
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
      <ErrorNotification message={error} onClose={clearError} />
      <div className="doctor-card__image">
        <img src={doctor.photoUrl} alt="Doctor" />
      </div>

      <div className="doctor-card__info">
        <div className="info-header">
          <div className="info-main">
            <h2 className="doctor-name">{doctor.fullName}</h2>
            <p className="specialization">{specialty?.name ?? ''}</p>

            {user === 'Manager' && isManaged && (
              <div className="doctor-card__schedule-info">
                {doctor.workStart?.slice(0, 5)} – {doctor.workEnd?.slice(0, 5)}
              </div>
            )}
          </div>
          {user === 'Manager' && isManaged && (
            <div className="doctor-card__actions">
              <button
                type="button"
                className="action-btn"
                onClick={handleUpdateSchedule}
              >
                Графік
              </button>
              <button
                type="button"
                className="action-btn danger"
                onClick={handleDelete}
              >
                Видалити
              </button>
            </div>
          )}
        </div>

        <div className="info-footer">
          {user === 'Manager' && (
            <button
              className="book-btn"
              onClick={() => navigate(`/doctors/${doctor.doctorId}`)}
            >
              Керувати
            </button>
          )}

          {(user === 'Patient' || !user) && (
            <button
              className="book-btn"
              onClick={() => {
                if (!user) {
                  navigate('/signin');
                  return;
                }

                navigate(bookTo ?? `/doctors/${doctor.doctorId}`);
              }}
            >
              Записатися
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
