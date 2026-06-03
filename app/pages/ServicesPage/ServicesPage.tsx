import "./ServicesPage.scss";

import { getDoctors } from "~/api/doctor";
import { getServices } from "~/api/service";
import { ServiceCard } from "~/components/ServicesCard/ServicesCard";
import type { Route } from "./+types/ServicesPage";

export async function loader() {
  return Promise.all([getDoctors(), getServices()]);
}

export default function ServicesPage({ loaderData }: Route.ComponentProps) {
  const [doctors, services] = loaderData;

  return (
    <div>
      <div className="servicesList">
        {services.map((service) => (
          <ServiceCard
            service={service}
            doctors={doctors}
            key={service.serviceId}
          />
        ))}
      </div>
    </div>
  );
}
