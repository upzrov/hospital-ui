import '~/styles/components/DoctorCard.scss';

import React from 'react';
import type { Doctor, Role, Specialties } from '~/types';
import { useNavigate, useOutletContext, useRevalidator } from 'react-router';
import { deleteDoctor, updateDoctor } from '~/api';
import { useError } from '~/hooks/useError';
import { ErrorNotification } from './ErrorNotification';

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

  const handleDelete = async () => {
    if (!confirm(`Видалити лікаря ${doctor.fullName}?`)) return;
    try {
      await deleteDoctor(doctor.doctorId);
      revalidator.revalidate();
    } catch (err) {
      handleError(err);
    }
  };

  const handleUpdateSchedule = async () => {
    const workStart = prompt(
      'Початок робочого дня (HH:MM)',
      doctor.workStart?.slice(0, 5) ?? '09:00',
    );
    const workEnd = prompt(
      'Кінець робочого дня (HH:MM)',
      doctor.workEnd?.slice(0, 5) ?? '17:00',
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

  return (
    <div className="doctor-card">
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
