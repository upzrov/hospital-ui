import './HomePage.scss'

import type {Route} from "../../../.react-router/types/app/routes/+types";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function HomePage() {
    return (
        <div className="content">

            {/*<div className="home--photo">*/}
            {/*    <img src="/photo/hospital-1.jpg" alt=""/>*/}
            {/*</div>*/}


            <div>
                {/*<DoctorCard doctor={doctor} />*/}
            </div>

        </div>
    )
}
