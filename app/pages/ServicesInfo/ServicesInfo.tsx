// import "./ServicesInfo.scss";
//
// import { getDoctors, getServices, getSpecialties } from "~/api";
// import type { Route } from "./+types/Doctor";
//
// export async function clientLoader() {
//     return Promise.all([getDoctors(), getServices(), getSpecialties()]);
// }
//
// export default function Service({ params, loaderData }: Route.ComponentProps) {
//     const [doctors, services, specialties] = loaderData;
//
//     const doctor = doctors.find((d) => d.doctorId === Number(params.doctorId));
//
//     if (!doctor) {
//         return (
//             <div className="doctor-detail-card">
//                 <h2>Лікаря не знайдено</h2>
//             </div>
//         );
//     }
//
//     const specialty = specialties.find((sp) => sp.id === doctor.specialty);
//
//     const workStart = doctor.workStart ? doctor.workStart.slice(0, 5) : "—";
//
//     const workEnd = doctor.workEnd ? doctor.workEnd.slice(0, 5) : "—";
//
//     return (
//         <div className="doctor-detail-card">
//             {/*<div className="doctor-detail-card__top">*/}
//             {/*    <div className="doctor-detail-card__image">*/}
//             {/*        <img src={doctor.photoUrl} alt={doctor.fullName} />*/}
//             {/*    </div>*/}
//
//             {/*    <div className="doctor-detail-card__main">*/}
//             {/*        <h1 className="doctor-detail-card__name">{doctor.fullName}</h1>*/}
//
//             {/*        <div className="doctor-detail-card__specialty">*/}
//             {/*            Спеціальність: {specialty?.name ?? "—"}*/}
//             {/*        </div>*/}
//
//             {/*        <div className="doctor-detail-card__email">Email: {doctor.email}</div>*/}
//
//             {/*        <div className="doctor-detail-card__schedule">*/}
//             {/*            Робочий час: <span>{workStart}</span> – <span>{workEnd}</span>*/}
//             {/*        </div>*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//
//             {/*<div className="doctor-detail-card__bottom">*/}
//             {/*    <div className="doctor-detail-card__services">*/}
//             {/*        {doctor.services?.length ? (*/}
//             {/*            doctor.services.map((s, index) => (*/}
//             {/*                <div className="service" key={index}>*/}
//             {/*                    {s.name}*/}
//             {/*                </div>*/}
//             {/*            ))*/}
//             {/*        ) : (*/}
//             {/*            <div>Послуги не вказані</div>*/}
//             {/*        )}*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//         </div>
//     );
// }