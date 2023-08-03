import logo from "../images/header/logo.svg";
import { Link, useLocation } from "react-router-dom/dist";
import Hamburger from "./Hamburger";
import AuthInfo from "./AuthInfo";
import { useState } from "react";

function Header({ loggedIn, email, signOut }) {
  const location = useLocation();
  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const linkText = location.pathname === "/sign-in" ? "Регистрация" : "Вход";

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(async (p) => setIsActive(!p));
  };

  return (
    <header className={`header ${loggedIn ? "header_logged-in" : ""}`}>
      <div className="header__links">
        <Link className="header__link" to="/">
          <span className="sr-only">Домой</span>
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        {loggedIn && (
          <Hamburger isActive={isActive} handleClick={handleClick} />
        )}
      </div>

      <>
        {loggedIn ? (
          <AuthInfo email={email} signOut={signOut} isActive={isActive} />
        ) : (
          <Link className="header__link" to={path}>
            {linkText}
          </Link>
        )}
      </>
    </header>
  );
}

export default Header;
