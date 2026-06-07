import { NavLink, useOutletContext } from "react-router";
import "~/styles/components/Header.scss";
import type { Role } from "~/types/auth";

export const Header = () => {
  const { user } = useOutletContext<{ user: Role | null }>();

  return (
    <div className="header">
      <div className="header__main">
        <NavLink to="/">
          <div className="logo-small"></div>
        </NavLink>

        <NavLink className="header--name" to="/services">
          <p>Послуги</p>
        </NavLink>

        <NavLink className="header--name" to="/doctors">
          <p>Лікарі</p>
        </NavLink>

        <NavLink className="header--name" to="/about">
          <p>Про нас</p>
        </NavLink>
      </div>

      <div className="header__secondary">
        {user ? (
          <NavLink className="header--name" to="/profile">
            <p>Мій кабінет</p>
          </NavLink>
        ) : (
          <NavLink className="header--name" to="/signin">
            <p>Увійти</p>
          </NavLink>
        )}

        <NavLink className="header--name" to="/contact">
          <p>Контакти</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
