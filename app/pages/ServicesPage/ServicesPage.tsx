import './ServicesPage.scss'

import {ServiceCard} from "~/components/ServicesCard/ServicesCard";
import React, {useEffect, useState} from "react";
import {getServices} from "~/api/service";
import {getDoctors} from "~/api/doctor";
import {getSpecialties} from "~/api/specialties";

export default function ServicesPage() {
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        getDoctors()
            .then(data => setDoctors(data))
            .catch(e => console.error(e));

        getServices()
            .then(data => setServices(data))
            .catch(e => console.error(e));
        getSpecialties()
            .then(data => setServices(data))
            .catch(e => console.error(e));
    }, [])

    return (
        <div>
            <div className='servicesList'>
                {services.map((service) => (
                    <ServiceCard service={service} doctors={doctors}/>
                ))}
            </div>
        </div>
    )
}