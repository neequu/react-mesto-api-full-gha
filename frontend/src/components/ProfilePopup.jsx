import { useContext, useEffect, lazy } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormValidation from "../utils/useFormValidation.js";

import PopupWithForm from "./PopupWithForm.jsx";
const FormInput = lazy(() => import("./FormInput.jsx"));

function ProfilePopup({ isOpen, onClose, isLoading, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, error, resetForm, handleChange, setValues } =
    useFormValidation();

  useEffect(
    () => setValues({ name: currentUser.name, about: currentUser.about }),
    [currentUser]
  );

  const handleSubmit = () => onUpdateUser(values);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <FormInput
        id="name"
        data-input="profile-name"
        type="text"
        className="form__input"
        placeholder="Ваше имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.name || ""}
        errorMsg={error.name}
      />
      <FormInput
        id="about"
        data-input="profile-about"
        type="text"
        className="form__input"
        placeholder="О себе"
        name="about"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={values.about || ""}
        errorMsg={error.about}
      />
    </PopupWithForm>
  );
}

export default ProfilePopup;
