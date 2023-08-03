import PopupWithForm from "./PopupWithForm.jsx";
import FormInput from "./FormInput.jsx";
import useFormValidation from "../utils/useFormValidation.js";

function PlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, error, resetForm, handleChange } = useFormValidation();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    await onAddPlace(values);
    resetForm();
  };

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={handleClose}
      buttonText={isLoading ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <FormInput
        id="place-title"
        data-input="place-name"
        type="text"
        className="form__input"
        placeholder="Название"
        name="name"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        errorMsg={error.name}
        value={values.name || ""}
      />
      <FormInput
        id="place-link"
        data-input="place-link"
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

export default PlacePopup;
