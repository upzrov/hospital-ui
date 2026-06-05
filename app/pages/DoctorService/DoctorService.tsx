import "./DoctorService.scss";

import type {Route} from "./+types/DoctorService";

import {
    getAvailableSlots,
    getDoctors,
    getServices,
    getSpecialties,
} from "~/api";
import type {Doctor, Service} from "~/types";
import {Link} from "react-router";
import ServiceCard from "~/components/ServicesCard/ServicesCard";
import ServiceCalendar from "~/components/ServiceCalendar/ServiceCalendar";
import {useState} from "react";

export async function clientLoader({params}: Route.LoaderArgs) {
    const doctorId = Number(params.doctorId);
    const serviceId = Number(params.serviceId);

    if (Number.isNaN(serviceId)) {
    }

    const date = new Date();

    return Promise.all([
        getDoctors(),
        getServices(),
        getSpecialties(),
        getAvailableSlots({
            doctorId,
            serviceId,
            date,
        }),
    ]);
}

export default function DoctorService({
                                          params,
                                          loaderData,
                                      }: Route.ComponentProps) {
    const [doctors, services, specialties, slots] = loaderData;

    const doctor: Doctor | undefined = doctors.find((d) => d.doctorId === Number(params.doctorId));
    const service: Service | undefined = services.find((s) => s.serviceId === Number(params.serviceId));

    console.log(slots);


    if (!doctor) {
        return (
            <div className="doctor-detail-card">
                <h2>Лікаря не знайдено</h2>
            </div>
        );
    }

    const specialty = specialties.find((sp) => sp.id === doctor.specialty);
    const workStart = doctor.workStart ? doctor.workStart.slice(0, 5) : "—";
    const workEnd = doctor.workEnd ? doctor.workEnd.slice(0, 5) : "—";

    function formatSlot(startAt: string, endAt: string) {

        const start = new Date(startAt);

        const end = new Date(endAt);

        const pad = (n: number) => n.toString().padStart(2, '0');

        const startTime = `${pad(start.getUTCHours())}:${pad(start.getUTCMinutes())}`;

        const endTime = `${pad(end.getUTCHours())}:${pad(end.getUTCMinutes())}`;

        return `${startTime} - ${endTime}`;

    }


    const [chosenSlot, setChosenSlot] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!chosenSlot) return alert('Будь ласка, оберіть час!');

        // Твоя логіка відправки даних на бекенд
        console.log("Запис на слот:", chosenSlot);
    };


    return (
        <div className="service-detail-card">

            <div className="service-detail-card__grid">

                {/* LEFT COLUMN */}

                <div className="service-detail-card__left">

                    <div className="service-detail-card__top">

                        <div className="service-detail-card__main">

                            <h1 className="service-detail-card__name">

                                {service?.name}

                            </h1>

                            <div className="service-detail-card__description">

                                {service?.description}

                            </div>

                            <div className="service-detail-card__price">

                                Ціна: {service?.price} $

                            </div>

                            <div className="service-detail-card__duration">

                                Тривалість: {service?.durationMinutes} хв

                            </div>

                            <div className="service-detail-card__specialty">

                                Спеціальність: {specialty?.name ?? "—"}

                            </div>

                        </div>

                    </div>

                    <div className="service-detail-card__doctor">

                        <h3>Лікар</h3>

                        <div className="service-detail-card__doctor-name">

                            {doctor.fullName}

                        </div>

                    </div>

                </div>

                {/* RIGHT COLUMN */}


                {/*<form className="service-detail-card__bottom" onSubmit={handleSubmit}>*/}
                {/*    <h3>Доступні слоти</h3>*/}

                {/*    /!* Вставляємо наш новий віджет календаря *!/*/}
                {/*    <ServiceCalendar*/}
                {/*        slots={slots}*/}
                {/*        formatSlot={formatSlot}*/}
                {/*        onSelectSlot={(slot) => setChosenSlot(slot)}*/}
                {/*    />*/}

                {/*    /!* Кнопка стає активною тільки після вибору часу *!/*/}
                {/*    <button type="submit" disabled={!chosenSlot}>*/}
                {/*        Записатися*/}
                {/*    </button>*/}
                {/*</form>*/}

                <form className="service-detail-card__bottom">
                    <h3>Доступні слоти</h3>



                    <div className="slots-grid">
                        {slots.map((slot, index) => (
                            <label key={index} className="slot-item">
                                <input
                                    type="radio"
                                    name="slot"
                                    value={slot.startAt}
                                    className="service"
                                />
                                {formatSlot(slot.startAt, slot.endAt)}
                            </label>
                        ))}
                    </div>

                    <button type="submit">Записатися</button>
                </form>

            </div>

        </div>
    );
}
