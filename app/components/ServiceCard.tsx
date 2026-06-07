import '~/styles/components/ServicesCard.scss';

import React from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import type { Doctor, Role, Service } from '~/types';

interface Props {
  service: Service;
  doctors: Doctor[];
  canManage?: boolean;
  onDelete?: (id: number) => void;
}

export const ServiceCard: React.FC<Props> = ({
  service,
  doctors,
  canManage,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Role | null }>();

  const availableDoctors = doctors.filter(
    (doc) => doc.specialty === service.specialty,
  );

  return (
    <div className="service-card">
      <div className="service-card__content">
        <h3 className="service-card__name">{service.name}</h3>
        <p className="service-card__description">{service.description}</p>

        <div className="service-card__details">
          <div className="detail-item">
            <span className="label">Ціна:</span>
            <span className="value price">${service.price}</span>
          </div>
          <div className="detail-item">
            <span className="label">Тривалість:</span>
            <span className="value">{service.durationMinutes} хв</span>
          </div>
        </div>

        <div className="service-card__footer">
          <div className="doctors-preview">
            {availableDoctors.length > 0 ? (
              <div className="doctors-stack">
                {availableDoctors.slice(0, 3).map((doc) => (
                  <img
                    key={doc.doctorId}
                    src={doc.photoUrl}
                    alt={doc.fullName}
                    title={doc.fullName}
                    className="doctor-avatar"
                  />
                ))}
                {availableDoctors.length > 3 && (
                  <div className="more-doctors">
                    +{availableDoctors.length - 3}
                  </div>
                )}
              </div>
            ) : (
              <span className="no-doctors">Немає доступних лікарів</span>
            )}
          </div>

          <div className="actions">
            {canManage && onDelete && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete(service.serviceId)}
              >
                Видалити
              </button>
            )}

            <button
              type="button"
              className="details-btn"
              onClick={() => navigate(`/services/${service.serviceId}`)}
            >
              Детальніше
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
