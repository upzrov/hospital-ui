import '~/styles/components/AppointmentsList.scss';

import { deleteAppointment } from '~/api';
import type { Appointment } from '~/types/appointment';
import type { Doctor } from '~/types/doctor';
import type { Role } from '~/types/auth';
import type { Service } from '~/types/service';
import type { Specialties } from '~/types/lookup';
import { useRevalidator } from 'react-router';
import { Modal } from '~/components/Modal';
import { useModal } from '~/hooks/useModal';

interface Props {
  user: Role | null;
  appointments: Appointment[];
  doctors: Doctor[];
  services: Service[];
  specialties: Specialties[];
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString('uk-UA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function formatTime(iso: string) {
  const date = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}

export function AppointmentsList({
  user,
  appointments,
  doctors,
  services,
  specialties,
}: Props) {
  const revalidator = useRevalidator();
  const { modalConfig, showModal, handleClose } = useModal();

  const canDelete = user === 'Patient' || user === 'Manager';

  const pageTitle =
    user === 'Administrator' || user === 'Manager'
      ? 'Усі записи'
      : user === 'Doctor'
        ? 'Мої прийоми'
        : 'Мої записи';

  const handleDelete = async (id: number) => {
    const confirmed = await showModal({
      title: 'Підтвердження',
      message: 'Скасувати цей запис?',
      type: 'confirm',
    });

    if (!confirmed) return;

    try {
      await deleteAppointment(id);
      revalidator.revalidate();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  // Group appointments by date
  const groupedAppointments = appointments.reduce(
    (groups: { [key: string]: Appointment[] }, appointment) => {
      const dateKey = appointment.startAt.split('T')[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(appointment);
      return groups;
    },
    {},
  );

  // Sort dates
  const sortedDates = Object.keys(groupedAppointments).sort();

  return (
    <>
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
      <section className="appointments-section">
      <div className="appointments-section__header">
        <h2>{pageTitle}</h2>
        <span className="appointments-count">
          {appointments.length} записів
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="appointments-section__empty">
          <div className="empty-icon">📅</div>
          <p>Записів не знайдено</p>
        </div>
      ) : (
        <div className="appointments-groups">
          {sortedDates.map((date) => (
            <div className="date-group" key={date}>
              <h3 className="date-group__title">{formatDate(date)}</h3>
              <div className="appointments-list">
                {groupedAppointments[date]
                  .sort((a, b) => a.startAt.localeCompare(b.startAt))
                  .map((appointment) => {
                    const doctor = doctors.find(
                      (d) => d.doctorId === appointment.doctorId,
                    );
                    const service = services.find(
                      (s) => s.serviceId === appointment.serviceId,
                    );
                    const specialty = specialties.find(
                      (sp) => sp.id === service?.specialty,
                    );

                    const isPast = new Date(appointment.endAt) < new Date();

                    return (
                      <div
                        className={`appointment-card ${isPast ? 'is-past' : ''}`}
                        key={appointment.appointmentId}
                      >
                        <div className="appointment-card__time-block">
                          <div className="start-time">
                            {formatTime(appointment.startAt)}
                          </div>
                          <div className="duration-line"></div>
                          <div className="end-time">
                            {formatTime(appointment.endAt)}
                          </div>
                        </div>

                        <div className="appointment-card__content">
                          <div className="appointment-card__service">
                            {service?.name ??
                              `Послуга #${appointment.serviceId}`}
                            {isPast && (
                              <span className="past-badge">Завершено</span>
                            )}
                          </div>

                          <div className="appointment-card__details">
                            <div className="detail-item doctor">
                              <span className="text">
                                {doctor?.fullName ?? `#${appointment.doctorId}`}
                                {specialty && (
                                  <span className="sub-text">
                                    {' '}
                                    • {specialty.name}
                                  </span>
                                )}
                              </span>
                            </div>

                            {(user === 'Administrator' ||
                              user === 'Manager') && (
                              <div className="detail-item patient">
                                <span className="text">
                                  ID пацієнта: {appointment.patientId}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {canDelete && !isPast && (
                          <div className="appointment-card__actions">
                            <button
                              className="cancel-btn"
                              onClick={() =>
                                handleDelete(appointment.appointmentId)
                              }
                              title="Скасувати запис"
                            >
                              Скасувати
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    </>
  );
}
