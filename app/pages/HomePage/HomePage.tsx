import './HomePage.scss'

import type {Route} from "../../../.react-router/types/app/routes/+types";
import DoctorCard from "~/components/DoctorCard/DoctorCard";
import {NavLink} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

const doc = {
    "doctorId": 1,
    "fullName": "Іван Петренко",
    "specialty": 0,
    "email": "ivan@hospital.com",
    "photoUrl": "https://randomuser.me/api/portraits/men/32.jpg",
    "gender": 0,
    "workStart": "09:00:00",
    "workEnd": "18:00:00",
    "services": [
        {
            "serviceId": 1,
            "name": "Консультація терапевта",
            "description": "Загальна консультація лікаря",
            "price": 50.0,
            "durationMinutes": 30,
            "specialty": 0
        },
        {
            "serviceId": 2,
            "name": "Огляд терапевта з аналізами",
            "description": "Консультація та необхідні аналізи",
            "price": 100.0,
            "durationMinutes": 40,
            "specialty": 0
        }
    ]
}

export default function HomePage() {
    return (
        <div className="content">

            <section className="hero">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <div className='hero-content--text'>Тут починається ваше здоров'я</div>
                            <p>Сучасна медицина, професійні лікарі та турбота про кожного пацієнта. Ми поруч, коли це
                                важливо.</p>

                            <div className="hero-buttons">
                                <NavLink to={'/doctors'} className="btn btn-primary">Записатися на прийом</NavLink>
                                <NavLink to={'/services'} className="btn btn-outline">Наші послуги</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="doctorsList__main">
                <DoctorCard doctor={doc}/>
                <DoctorCard doctor={doc}/>
            </div>


            <div>
                {/*<DoctorCard doctor={doctor} />*/}
            </div>

        </div>
    )
}
