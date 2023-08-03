import hamburger from "../images/hamburger.svg";
import close from "../images/close.svg";

function Hamburger({ handleClick, isActive }) {
  return (
    <button className="header__menu" onClick={handleClick}>
      <p className="sr-only">Меню навигации</p>
      <img src={isActive ? close : hamburger} alt="меню" />
    </button>
  );
}

export default Hamburger;
