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

const sdfsdf = {

    "doctorId": 1,
    "fullName": "Dr. John Smith",
    "specialty": 0,
    "email": "john.smith@hospital.com",
    "phoneNumber": "+380501112233"

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
                <DoctorCard doctor={sdfsdf}/>
                <DoctorCard doctor={sdfsdf}/>
            </div>


            <div>
                {/*<DoctorCard doctor={doctor} />*/}
            </div>

        </div>
    )
}
