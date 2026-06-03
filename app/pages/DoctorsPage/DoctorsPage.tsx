import './DoctorsPage.scss'
import DoctorCard from "~/components/DoctorCard/DoctorCard";
import {useEffect, useState} from "react";
import {getDoctors} from "~/api/doctor";
import {getServices} from "~/api/service";
import {getSpecialties} from "~/api/specialties";


export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [specialties, setSpecialties] = useState<Specialties[]>([]);

    useEffect(() => {
        getDoctors()
            .then(data => setDoctors(data))
            .catch(e => console.error(e));

        getServices()
            .then(data => setServices(data))
            .catch(e => console.error(e));
        getSpecialties()
            .then(data => setSpecialties(data))
            .catch(e => console.error(e));
    }, [])




    return (
        <div>
            <h1>Doctors Page</h1>

            <div
                className="doctorsList"
            >
                {doctors.map((doctor) => (
                    <DoctorCard doctor={doctor} services={services} specialties={specialties}/>
                ))}
            </div>
        </div>
    )
}