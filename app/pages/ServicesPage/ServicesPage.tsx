import {ServiceCard} from "~/components/ServicesCard/ServicesCard";
import React, {useEffect} from "react";
import {getServices} from "~/api/service";

export default function ServicesPage() {
    const [services, setServices] = React.useState<[]>([]);

    useEffect(() => {
        getServices()
            .then((services) => setServices(services))
            .catch(e => console.error(e));
    }, [])

    return (
        <div>
            <h1>Services Page</h1>
            {services.map((service) => (
                <ServiceCard service={service}/>
            ))}
        </div>
    )
}