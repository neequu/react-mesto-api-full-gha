import ok from "../images/ok.svg";
import x from "../images/x.svg";
import Popup from "./Popup";

function InfoTooltip({ success, onClose, isOpen }) {
  return (
    <Popup isOpen={isOpen} name="auth" onClose={onClose}>
      <div className="popup__container popup__container_auth">
        <button
          type="button"
          className="popup__close-button"
          data-button="close"
          onClick={onClose}
        ></button>
        <img src={success ? ok : x} alt="menu" />
        <h3>
          {success
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`}
        </h3>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
