import './DoctorCard.scss'
import React from "react";

type Props = {
    doctor: Doctor
}

export const DoctorCard: React.FC<Props> = ({doctor}) => {
    return (
        <div className="doctor-card">
            <div className="doctor-card__image">
                <img src='https://i.dobrobut.com/storage/images/doctor/450-450/708f528b0ca8c13fadae9f3c7be490a1.webp'
                     alt="Doctor"/>
            </div>

            <div className="doctor-card__info">
                <div className="info-header">
                    <div className="info-main">
                        <h2 className="doctor-name">{doctor.fullName}</h2>
                        <p className="specialization">Масажист; Реабілітолог {doctor.specialty}</p>
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