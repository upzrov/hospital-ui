import './DoctorCard.scss'
import React from "react";

type Props = {
    doctor: Doctor,
    services: Service[],
}

export const DoctorCard: React.FC<Props> = ({doctor, services}) => {
    console.log('services', services);

    const specialty: Service[] = services.filter(service => service.serviceId === doctor.specialty)

    return (
        <div className="doctor-card">
            <div className="doctor-card__image">
                <img src={doctor.photoUrl}
                     alt="Doctor"/>
            </div>

            <div className="doctor-card__info">
                <div className="info-header">
                    <div className="info-main">
                        <h2 className="doctor-name">{doctor.fullName}</h2>
                        <p className="specialization">{doctor.specialty}</p>
                    </div>
                </div>
                <div className="info-footer">
                    <button className="book-btn">Записатися</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard;