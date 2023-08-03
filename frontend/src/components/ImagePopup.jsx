import Popup from "./Popup";

function ImagePopup({ card: { name, link }, isOpen, onClose }) {
  return (
    <Popup name="image" isOpen={isOpen} onClose={onClose}>
      <div className="popup__expanded-image-container">
        <button
          type="button"
          className="popup__close-button"
          data-button="close"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img src={link} id="popup-img" className="popup__img" alt={name} />
          <figcaption id="popup-caption" className="popup__caption">
            {name}
          </figcaption>
        </figure>
      </div>
    </Popup>
  );
}

export default ImagePopup;
