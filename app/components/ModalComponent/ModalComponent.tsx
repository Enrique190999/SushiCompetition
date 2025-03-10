import React from "react";
import "./ModalComponent.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message: string | React.ReactNode;
  showClose?: boolean;
};

export const ModalComponent: React.FC<Props> = ({ isOpen, onClose, message, showClose = true }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {message}
        {showClose && <button className="modal-button" onClick={onClose}>Aceptar</button>}
      </div>
    </div>
  );
};
