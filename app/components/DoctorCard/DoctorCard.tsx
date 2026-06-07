import "./DoctorCard.scss";

import React from "react";
import type { Doctor, Role, Service, Specialties } from "~/types";
import { useNavigate, useOutletContext } from "react-router";

type Props = {
  doctor: Doctor;
  services?: Service[];
  specialties?: Specialties[];
  bookTo?: string;
  requireRole?: Role;
};

export const DoctorCard: React.FC<Props> = ({
  doctor,
  services = [],
  specialties = [],
  bookTo,
  requireRole,
}) => {
  const specialty = specialties?.find(
    (s: Specialties) => s.id === doctor.specialty,
  );

  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: Role | null }>();

  return (
    <div className="doctor-card">
      <div className="doctor-card__image">
        <img src={doctor.photoUrl} alt="Doctor" />
      </div>

      <div className="doctor-card__info">
        <div className="info-header">
          <div className="info-main">
            <h2 className="doctor-name">{doctor.fullName}</h2>
            <p className="specialization">{specialty?.name ?? ""}</p>
          </div>
        </div>
        <div className="info-footer">
          {(user === "Patient" || !user) && (
            <button
              className="book-btn"
              onClick={() => {
                if (!user) {
                  navigate("/signin");
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
