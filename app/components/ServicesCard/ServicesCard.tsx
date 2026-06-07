import "./ServicesCard.scss";

import React from "react";
import { useNavigate, useOutletContext } from "react-router";
import type { Doctor, Role, Service } from "~/types";

type Props = {
  service: Service;
  doctors: Doctor[];
  canManage?: boolean;
  onDelete?: (id: number) => void;
};

export const ServiceCard: React.FC<Props> = ({
  service,
  doctors,
  canManage,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Role | null }>();

  const NumberOfSpecialists = [...doctors].filter(
    (doc) => doc.specialty === service.specialty,
  );

  const handleBooking = () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    navigate(`/services/${service.serviceId}`);
  };

  return (
    <div className="service-card">
      <div className="service-card-row">
        <div className="service-card-row__content">
          <div className="service-card-row__info">
            <div className="info-main">
              <h2 className="service-title">{service.name}</h2>
              <p className="service-description">{service.description}</p>
            </div>

            <div className="service-tags">
              <div className="tag duration">
                <span className="tag-icon">⏱</span>
                {service.durationMinutes} хв
              </div>
              <div className="tag specialty">
                {`Кількість спеціалістів: ${NumberOfSpecialists.length}`}
              </div>
            </div>
          </div>

          <div className="service-card-row__side">
            <div className="price-badge">
              <span className="price-amount">{service.price}$</span>
              <span className="price-label">вартість послуги</span>
            </div>
            <div className="service-card-row__actions">
              {(user === "Patient" || !user) && (
                <button className="service-action-btn" onClick={handleBooking}>
                  Записатися
                </button>
              )}
              {canManage && onDelete && (
                <button
                  className="service-delete-btn"
                  onClick={() => onDelete(service.serviceId)}
                >
                  Видалити
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
