import '~/styles/components/DoctorInfo.scss';

interface DoctorInfoProps {
  fullName: string;
  photoUrl?: string;
  specialtyName?: string;
}

export function DoctorInfo({
  fullName,
  photoUrl,
  specialtyName,
}: DoctorInfoProps) {
  return (
    <div className="doctor-info-block">
      <h3>Лікар</h3>
      <div className="doctor-info-block__content">
        <img src={photoUrl || '/photo/hospital-1.jpg'} alt={fullName} />
        <div className="doctor-info-block__text">
          <span className="doctor-info-block__name">{fullName}</span>
          {specialtyName && (
            <span className="doctor-info-block__specialty">
              {specialtyName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
