import './Header.scss'
import {NavLink} from "react-router";

export const Header = () => {
    return (
        <div className="header">
            <div className="header__main">
                <NavLink to="/">
                    <div className='logo-small'></div>
                </NavLink>

                <NavLink className="header--name" to={'/doctors'}>
                    <p>Лікарі</p> {/* doctor.tsx */}
                </NavLink>

                <NavLink className="header--name" to={'/services'}>
                    <p>Послуги</p> {/* services.tsx */}
                </NavLink>

                <NavLink className="header--name" to={'/about'}>
                    <p>Про нас</p> {/* about.tsx */}
                </NavLink>
            </div>

            <div className="header__secondary">

                <NavLink className="header--name" to={'/personalAccount'}>
                    <p>Мій кабінет</p> {/* personalAccount.tsx */}
                </NavLink>

                <NavLink className="header--name" to={'/contact'}>
                    <p>Контакти</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Header;