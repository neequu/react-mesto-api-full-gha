import PopupWithForm from "./PopupWithForm.jsx";

function ConfirmPopup({ isOpen, onClose, onSubmit, isLoading }) {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={isLoading ? "Загрузка..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

export default ConfirmPopup;
