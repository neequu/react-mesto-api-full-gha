import { useEffect } from "react";

function Popup({ onClose, isOpen, name, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => (e.key === "Escape" ? onClose() : "");

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) =>
    e.target === e.currentTarget ? onClose() : "";

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id={`popup-${name}`}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}

export default Popup;
