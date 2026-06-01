import './DoctorsPage.scss'
import DoctorCard from "~/components/DoctorCard/DoctorCard";
import {useEffect, useState} from "react";
import {getDoctors} from "~/api/doctor";
import {getServices} from "~/api/service";


export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        getDoctors()
            .then(data => setDoctors(data))
            .catch(e => console.error(e));

        getServices()
            .then(data => setServices(data))
            .catch(e => console.error(e));
    }, [])


    console.log('doctors', getServices());

    return (
        <div>
            <h1>Doctors Page</h1>

            <div className="doctorsList">
                {doctors.map((doctor) => (
                    <DoctorCard doctor={doctor} services={services}/>
                ))}
            </div>
        </div>
    )
}