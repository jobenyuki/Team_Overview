import React from 'react'
// Import custom hooks
import { useStyle } from 'Hooks'
// Import styles
import './style.scss'

const Label = ({ children = '', round = false, outline = false, className = '', ...rest }) => {
  const { style } = useStyle()

  return (
    <div
      className={`label ${round ? 'label--round' : ''} ${
        outline ? 'label--outline' : ''
      } ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Label
