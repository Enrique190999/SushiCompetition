import React from "react";
import "./SpinnerComponent.css";

type Props = {
  isLoading: boolean;
};

export const SpinnerComponent: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="spinner-overlay">
      <img src="app/assets/spinner.svg" alt="Cargando..." className="spinner" />
    </div>
  );
};
