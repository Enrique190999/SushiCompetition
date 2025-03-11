import React, { useState, useRef } from "react";
import './JoinNumberComponent.css'

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const JoinNumberComponent: React.FC<Props> = ({ value = "", onChange, id, className = "", style }) => {
  const [otp, setOtp] = useState(value.padEnd(6, "")); // Rellenamos hasta 6 caracteres
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = otp.split("");
    newOtp[index] = event.target.value.slice(-1); // Solo un carácter por input
    const updatedOtp = newOtp.join("");
    setOtp(updatedOtp);

    if (onChange) {
      onChange(updatedOtp);
    }

    // Pasar al siguiente input si hay un valor
    if (event.target.value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div id={id} className={`.parent-inputjoin ${className}`} style={style}>
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputsRef.current[index] = el; // Asignar a useRef sin devolver nada
          }}
          type="text"
          className="input-join"
          value={otp[index] || ""}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          maxLength={1}
        />
      ))}
    </div>
  );
};
