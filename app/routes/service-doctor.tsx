import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import {
  createAppointment,
  getDoctor,
  getService,
  getSpecialties,
} from '~/api';
import { DoctorInfo } from '~/components/DoctorInfo';
import { ErrorNotification } from '~/components/ErrorNotification';
import { SlotPicker } from '~/components/SlotPicker';
import { useError } from '~/hooks/useError';
import '~/styles/routes/service-doctor.scss';
import type { Role } from '~/types/auth';
import type { Route } from './+types/service-doctor';

export async function clientLoader({ params }: Route.LoaderArgs) {
  const serviceId = Number(params.serviceId);
  const doctorId = Number(params.doctorId);

  const [service, doctor, specialties] = await Promise.all([
    getService(serviceId),
    getDoctor(doctorId),
    getSpecialties(),
  ]);

  return [service, doctor, specialties] as const;
}

export default function ServiceDoctor({
  params,
  loaderData,
}: Route.ComponentProps) {
  const [service, doctor, specialties] = loaderData;
  const [chosenSlot, setChosenSlot] = useState<string>('');
  const { error, handleError, clearError } = useError();

  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Role | null }>();

  const doctorId = Number(params.doctorId);
  const serviceId = Number(params.serviceId);

  const canBook = user === 'Patient';

  const specialty = specialties.find((sp) => sp.id === service.specialty);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canBook) {
      handleError('Записатися можуть лише пацієнти');
      return;
    }

    if (!chosenSlot) {
      handleError('Будь ласка, оберіть час!');
      return;
    }

    try {
      await createAppointment({
        doctorId,
        serviceId,
        startAt: chosenSlot,
      });

      navigate('/profile');
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="service-doctor-card">
      <ErrorNotification message={error} onClose={clearError} />
      <div className="service-doctor-card__main">
        <h1 className="service-doctor-card__name">{service.name}</h1>

        <div className="service-doctor-card__description">
          {service.description}
        </div>

        <div className="service-doctor-card__meta">
          <div className="service-doctor-card__price">
            Ціна: ${service.price}
          </div>

          <div className="service-doctor-card__duration">
            Тривалість: {service.durationMinutes} хв
          </div>
        </div>
      </div>

      <div className="service-doctor-card__doctor">
        <DoctorInfo
          fullName={doctor.fullName}
          photoUrl={doctor.photoUrl}
          specialtyName={
            specialties.find((s) => s.id === doctor.specialty)?.name
          }
        />
      </div>

      <form className="service-doctor-card__booking" onSubmit={handleSubmit}>
        <h3>Доступні слоти</h3>

        {!user && (
          <p className="service-doctor-card__notice">
            Увійдіть як пацієнт, щоб записатися
          </p>
        )}

        {user && !canBook && (
          <p className="service-doctor-card__notice">
            Записатися можуть лише пацієнти
          </p>
        )}

        <SlotPicker
          doctorId={doctorId}
          serviceId={serviceId}
          onSelect={setChosenSlot}
          disabled={!canBook}
        />

        <div className="service-doctor-card__actions">
          <button type="submit" disabled={!canBook}>
            Записатися на прийом
          </button>
        </div>
      </form>
    </div>
  );
}
