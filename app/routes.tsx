import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/Home.tsx'),

    route('signin', 'routes/Signin.tsx'),
    route('signup', 'routes/Signup.tsx'),

    route('doctors', 'routes/Doctors.tsx'),
    route('doctors/:id', 'routes/Doctor.tsx'),
    route('doctors/:doctorId/:serviceId', 'routes/DoctorService.tsx'),
    route('services', 'routes/Services.tsx'),
    route('services/:serviceId/:doctorId', 'routes/ServiceDoctor.tsx'),
    route('services/:id', 'routes/Service.tsx'),
    route('about', 'routes/About.tsx'),

    route('profile', 'routes/Profile.tsx'),
    route('contact', 'routes/Contact.tsx'),
  ]),
] satisfies RouteConfig;
