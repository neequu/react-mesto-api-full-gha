import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDeleteReq }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, link, likes } = card;
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const handleCardClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleCardDeleteReq = () => onCardDeleteReq(card);

  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__delete-button"
          data-button="delete"
          onClick={handleCardDeleteReq}
        ></button>
      )}
      <img
        onClick={handleCardClick}
        className="element__image"
        src={link}
        alt={name}
        loading="lazy"
      />
      <div className="element__info">
        <h2 className="element__heading">{name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            data-button="like"
            className={`element__like ${isLiked && "element__like_active"}`}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
