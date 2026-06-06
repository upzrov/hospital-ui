import './ServicesCard.scss'

import React, {type Component} from "react";
import {useNavigate, useOutletContext} from "react-router";
import type {Doctor, Role, Service} from "~/types";

type Props = {
    service: Service;
    doctors: Doctor[];
}

export const ServiceCard: React.FC<Props> = ({service, doctors}) => {
    const navigate = useNavigate();
    const {user} = useOutletContext<{ user: Role | null }>();

    const NumberOfSpecialists = [...doctors].filter((doc) => doc.specialty === service.specialty)

    return (
        <div className="service-card">
            <div className="service-card-row">
                <div className="service-card-row__content">
                    <div className="service-card-row__info">
                        <div className="info-main">
                            <h2 className="service-title">
                                {service.name}
                            </h2>
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
                        <button
                            className="service-action-btn"
                            onClick={() => navigate(`/services/${service.serviceId}`)}>
                            Записатися
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;