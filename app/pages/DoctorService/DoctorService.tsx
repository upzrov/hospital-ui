import "./DoctorService.scss";

import type {Route} from "./+types/DoctorService";

import { getAvailableSlots, getDoctor, getSpecialties } from "~/api";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const doctorId = Number(params.doctorId);
  const serviceId = Number(params.serviceId);

  const date = new Date();
  date.setDate(date.getDate() + 1);

  return Promise.all([
    getDoctor(doctorId),
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
  const [doctor, specialties, slots] = loaderData;

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
