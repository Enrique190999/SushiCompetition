import React from "react";
import "./TextBoxComponent.css";

type Props = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: "text" | "password" | "email" | "number";
};

export const TextBoxComponent: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "",
  id,
  className = "",
  style,
  type = "text",
}) => {
  return (
    <input
      type={type}
      id={id}
      className={`textbox-component ${className}`}
      style={style}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
