import { useContext } from "react";
import loadingImage from "../images/profile/loading.gif";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Footer from "./Footer.jsx";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDeleteReq,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div
            className="profile__avatar-container"
            id="change-avatar"
            onClick={onEditAvatar}
          >
            <img
              id="profile-avatar"
              className="profile__avatar"
              src={currentUser.avatar || loadingImage}
              alt="фотография профиля"
            />
          </div>

          <div className="profile__info">
            <div className="profile__person-info">
              <div className="profile__flex-group">
                <h1 id="profile-name" className="profile__name">
                  {currentUser.name || "loading..."}
                </h1>
                <button
                  id="profile-edit-button"
                  className="profile__edit-button"
                  type="button"
                  data-button="popup-open"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p id="profile-about" className="profile__about">
                {currentUser.about || "loading..."}
              </p>
            </div>

            <button
              className="profile__add-button"
              type="button"
              id="new-place-button"
              data-button="popup-open"
              onClick={onAddPlace}
            ></button>
          </div>
        </section>

        <section
          className="elements"
          id="elements"
          aria-label="сетка из изображений"
        >
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteReq={onCardDeleteReq}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
