import React from 'react'
import './ButtonComponent.css'
type Props = {
  text?: string
  href?: () => void
  id?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

export const ButtonComponent = (props: Props) => {
  return (
    <a
      className={`button-component ${props.className}`} 
      ref={props.href} 
      id={props.id} 
      style={props.style} 
      type={props.type}
    >
      {props.text}
    </a>
  )
}