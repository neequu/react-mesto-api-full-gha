import PopupWithForm from "./PopupWithForm.jsx";
import FormInput from "./FormInput.jsx";
import useFormValidation from "../utils/useFormValidation.js";

function AvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, error, resetForm, handleChange } = useFormValidation();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    await onUpdateAvatar(values);
    resetForm();
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={handleClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <FormInput
        id="avatar-link"
        data-input="avatar-link"
        type="url"
        className="form__input"
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleChange}
        errorMsg={error.link || ""}
        value={values.link || ""}
      />
    </PopupWithForm>
  );
}

export default AvatarPopup;
