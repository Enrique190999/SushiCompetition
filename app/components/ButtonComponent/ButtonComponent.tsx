import React from 'react'
import './ButtonComponent.css'

type Props = {
  text?: string
  onClick?: () => void
  id?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

export const ButtonComponent: React.FC<Props> = ({
  text = 'Click me',
  onClick,
  id,
  className = '',
  disabled = false,
  type = 'button',
  style,
}) => {
  return (
    <button
      className={`button-component ${className}`}
      onClick={onClick}
      id={id}
      style={style}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
