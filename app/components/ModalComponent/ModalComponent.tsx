import React from "react";
import "./ModalComponent.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

export const ModalComponent: React.FC<Props> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal-button" onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};
