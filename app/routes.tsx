import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("pages/HomePage/HomePage.tsx"),

        route("doctors", "pages/DoctorsPage/DoctorsPage.tsx"),
        route("services", "pages/ServicesPage/ServicesPage.tsx"),
        route("about", "pages/AboutPage/AboutPage.tsx"),
        route("personalAccount", "pages/PersonalAccountPage/PersonalAccountPage.tsx"),
        route("contact", "pages/ContactPage/ContactPage.tsx"),


        // route("uikit", "routes/uikit.tsx"),
    ])
] satisfies RouteConfig;
