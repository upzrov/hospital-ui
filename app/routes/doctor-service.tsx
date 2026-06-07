import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import {
  createAppointment,
  getDoctor,
  getService,
  getSpecialties,
} from '~/api';
import { DoctorInfo } from '~/components/DoctorInfo';
import { SlotPicker } from '~/components/SlotPicker';
import { Modal } from '~/components/Modal';
import { useModal } from '~/hooks/useModal';
import '~/styles/routes/doctor-service.scss';
import type { Role } from '~/types/auth';
import type { Route } from './+types/doctor-service';

export async function clientLoader({ params }: Route.LoaderArgs) {
  const doctorId = Number(params.doctorId);
  const serviceId = Number(params.serviceId);

  const [doctor, service, specialties] = await Promise.all([
    getDoctor(doctorId),
    getService(serviceId),
    getSpecialties(),
  ]);

  return [doctor, service, specialties] as const;
}

export default function DoctorService({
  params,
  loaderData,
}: Route.ComponentProps) {
  const [doctor, service, specialties] = loaderData;
  const [chosenSlot, setChosenSlot] = useState<string>('');

  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Role | null }>();
  const { modalConfig, showModal, handleClose } = useModal();

  const doctorId = Number(params.doctorId);
  const serviceId = Number(params.serviceId);

  const canBook = user === 'Patient';

  const specialty = specialties.find((sp) => sp.id === doctor.specialty);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canBook) {
      await showModal({
        title: 'Помилка',
        message: 'Записатися можуть лише пацієнти',
        type: 'alert'
      });
      return;
    }

    if (!chosenSlot) {
      await showModal({
        title: 'Увага',
        message: 'Будь ласка, оберіть час!',
        type: 'alert'
      });
      return;
    }

    await createAppointment({
      doctorId,
      serviceId,
      startAt: chosenSlot,
    });

    navigate('/profile');
  };

  return (
    <div className="service-detail-card">
      {modalConfig && (
        <Modal 
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          onClose={handleClose}
        />
      )}
      <DoctorInfo
        fullName={doctor.fullName}
        photoUrl={doctor.photoUrl}
        specialtyName={specialty?.name}
      />

      <div className="service-detail-card__main">
        <h1 className="service-detail-card__name">{service.name}</h1>

        <div className="service-detail-card__description">
          {service.description}
        </div>

        <div className="service-detail-card__meta">
          <div className="service-detail-card__price">
            Ціна: ${service.price}
          </div>

          <div className="service-detail-card__duration">
            Тривалість: {service.durationMinutes} хв
          </div>
        </div>
      </div>

      <form className="service-detail-card__booking" onSubmit={handleSubmit}>
        <h3>Доступні слоти</h3>

        {!user && (
          <p className="service-detail-card__notice">
            Увійдіть як пацієнт, щоб записатися
          </p>
        )}

        {user && !canBook && (
          <p className="service-detail-card__notice">
            Записатися можуть лише пацієнти
          </p>
        )}

        <SlotPicker
          doctorId={doctorId}
          serviceId={serviceId}
          onSelect={setChosenSlot}
          disabled={!canBook}
        />

        <div className="service-detail-card__actions">
          <button type="submit" disabled={!canBook}>
            Записатися на прийом
          </button>
        </div>
      </form>
    </div>
  );
}
