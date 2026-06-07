import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),

    route('signin', 'routes/sign-in.tsx'),
    route('signup', 'routes/sign-up.tsx'),

    route('doctors', 'routes/doctors.tsx'),
    route('doctors/:id', 'routes/doctor.tsx'),
    route('doctors/:doctorId/:serviceId', 'routes/doctor-service.tsx'),
    route('services', 'routes/services.tsx'),
    route('services/:serviceId/:doctorId', 'routes/service-doctor.tsx'),
    route('services/:id', 'routes/service.tsx'),
    route('about', 'routes/about.tsx'),

    route('profile', 'routes/profile.tsx'),
    route('patients', 'routes/patients.tsx'),
    route('managers', 'routes/managers.tsx'),
    route('contact', 'routes/contact.tsx'),
  ]),
] satisfies RouteConfig;
