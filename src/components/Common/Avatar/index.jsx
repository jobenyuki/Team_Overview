import React from 'react'
// Import utils
import { getShortName } from 'Utils'
// Import custom hooks
import { useStyle } from 'Hooks'
// Import styles
import './style.scss'

const Avatar = ({ memberName = '', className = '', ...rest }) => {
  const { style } = useStyle()

  return (
    <div className={`avatar ${className}`} style={style} {...rest}>
      <span>{getShortName(memberName)}</span>
    </div>
  )
}

export default Avatar
