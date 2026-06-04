import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("pages/layout.tsx", [
    index("pages/HomePage/HomePage.tsx"),

    route("signin", "pages/Signin/Signin.tsx"),
    route("signup", "pages/Signup/Signup.tsx"),

    route("doctors", "pages/DoctorsPage/DoctorsPage.tsx"),
    route("services", "pages/ServicesPage/ServicesPage.tsx"),
    route("about", "pages/AboutPage/AboutPage.tsx"),

    route("profile", "pages/Profile/Profile.tsx"),
    route("contact", "pages/ContactPage/ContactPage.tsx"),
  ]),
] satisfies RouteConfig;
