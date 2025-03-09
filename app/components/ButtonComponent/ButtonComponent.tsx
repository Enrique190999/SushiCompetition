import React from 'react'
import './ButtonComponent.css'
import { Link } from 'react-router'

type Props = {
  handlerClick?: () => void,
  text?: string
  href: string
  id?: string
  className?: string
  style?: React.CSSProperties
  type: 'button' | 'submit' | 'reset'
}

export const ButtonComponent: React.FC<Props> = ({
  text,
  href,
  id,
  className = '',
  type = 'button',
  style,
  handlerClick = () => { }
}) => {
  return (
    <Link
      className={`button-component ${className}`}
      id={id}
      style={style}
      type={type}
      to={href}
      onClick={handlerClick}>
      {text}
    </Link>
  )
}
