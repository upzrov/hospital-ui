import './DoctorCard.scss'
import React from "react";

type Props = {
    doctor: Doctor,
    services?: Service[],
    specialties?: Specialties[],
}

export const DoctorCard: React.FC<Props> = ({doctor, services = [], specialties = []}) => {
    const specialty = specialties?.find((s: Specialties) => s.id === doctor.specialty);

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
                        <p className="specialization">{specialty?.name ?? ''}</p>
                    </div>
                </div>
                <div className="info-footer">
                    <button className="book-btn" onClick={() => console.log('sdfsdf')}>Записатися</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard;