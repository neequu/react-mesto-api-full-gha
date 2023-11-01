import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// header component
import Header from "./Header.jsx";
// protected routes
import ProtectedRoutes from "./ProtectedRoutes.jsx";
// api requests handlers
import api from "../utils/api.js";
import { register, validate, signin } from "../utils/auth.js";
// context
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
// components
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Main from "./Main.jsx";
import ProfilePopup from "./ProfilePopup.jsx";
import AvatarPopup from "./AvatarPopup.jsx";
import PlacePopup from "./PlacePopup.jsx";
import ConfirmPopup from "./ConfirmPopup.jsx";

function Root() {
  // popup state
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setPlacePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  // cards state
  const [selectedCard, setSelectedCard] = useState({});
  const [deletingCard, setDeletingCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // user state
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // navigate hook
  const navigate = useNavigate();
  // get cards data on load
  useEffect(() => {
    if (!loggedIn) return;
    const jwt = localStorage.getItem('jwt');

    const fetchData = async () => {
      try {
        const [initialCards, userData] = await Promise.all([
          api.getInitialCards(jwt),
          api.getUserInfo(jwt),
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [loggedIn]);
  // check login token on load
  useEffect(() => {
    if (!localStorage.getItem("jwt")) return;

    const authorizeOnLoad = async () => {
      const token = localStorage.getItem("jwt");
      authorize(token);
    };

    authorizeOnLoad();
  }, []);
  // popup buttons
  const handleEditProfileClick = () => setProfilePopupOpen(!isProfilePopupOpen);
  const handleAddPlaceClick = () => setPlacePopupOpen(!isPlacePopupOpen);
  const handleEditAvatarClick = () => setAvatarPopupOpen(!isAvatarPopupOpen);

  // close popups
  const closeAllPopups = () => {
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  };
  // update data through popups w/ single req
  const makeRequest = async (request) => {
    setIsLoading(true);
    try {
      await request();
      closeAllPopups();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  // selected card
  const handleCardClick = async (card) => {
    setSelectedCard(card);
    await new Promise((r) => setTimeout(r, 40));
    setImagePopupOpen(true);
  };
  // liking a card
  const handleCardLike = async (card) => {
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some((i) => i === currentUser._id);
    try {
      const res = await api.changeLikeCardStatus(card._id, isLiked, jwt);
      setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
    } catch (e) {
      console.log(e);
    }
  };
  // deleting a card
  const handleCardDelete = () => {
    const jwt = localStorage.getItem('jwt');
    const cb = async () => {
      await api.deleteCard(deletingCard._id, jwt);
      setCards((state) => state.filter((c) => c._id !== deletingCard._id));
    };

    return makeRequest(cb);
  };
  // confirming deleting
  const handleCardDeleteReq = (card) => {
    setConfirmPopupOpen(true);
    setDeletingCard(card);
  };
  // update user info
  const handleUpdateUser = (user) => {
    const jwt = localStorage.getItem('jwt');
    const cb = async () => {
      const res = await api.editUserInfo(user, jwt);
      setCurrentUser(res);
    };

    return makeRequest(cb);
  };
  // update avatar
  const handleUpdateAvatar = async (avatar) => {
    const jwt = localStorage.getItem('jwt');
    const cb = async () => {
      const res = await api.editAvatar(avatar, jwt);
      setCurrentUser(res);
    };

    return makeRequest(cb);
  };
  // add new place
  const handleAddPlace = async (place) => {
    const jwt = localStorage.getItem('jwt');
    const cb = async () => {
      const res = await api.addCard(place, jwt);
      setCards([res, ...cards]);
    };

    return makeRequest(cb);
  };

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const { token } = await signin(data);

      if (!token) throw Error("токен неверный");
      localStorage.setItem("jwt", token);

      authorize(token);
    } catch (e) {
      console.log(e);
      setSuccess(false);
      setInfoTooltipOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const authorize = async (token) => {
    try {
      const loginInfo = await getData(token);


      setEmail(loginInfo.email);
      setLoggedIn(true);
      setSuccess(true);
      navigate("/");
    } catch (e) {
      console.log(e);
      setSuccess(false);
      setInfoTooltipOpen(true);
    }
  };

  const getData = async (token) => {
    const res = await validate(token);
    return res;
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      await register(data);
      setSuccess(true);
      navigate("/");
    } catch (e) {
      setSuccess(false);
      console.log(e);
    } finally {
      setInfoTooltipOpen(true);
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");

    setLoggedIn(false);
    setSuccess(null);
    setEmail("");
    navigate("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} signOut={handleSignOut} />
      <Routes>
        <Route
          path="/sign-in"
          element={<Login onLogin={handleLogin} isLoading={isLoading} />}
        />

        <Route
          path="/sign-up"
          element={
            <Register onRegister={handleRegister} isLoading={isLoading} />
          }
        />
        {/* protected routes wrapper */}
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route
            path="/"
            element={
              <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDeleteReq={handleCardDeleteReq}
              />
            }
          />
        </Route>
      </Routes>

      <ProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <AvatarPopup
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <PlacePopup
        isOpen={isPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        isLoading={isLoading}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        isLoading={isLoading}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        success={success}
      />
    </CurrentUserContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
