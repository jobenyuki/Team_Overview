import React from 'react'
// Import styles
import './style.scss'

const SearchBox = ({ value = '', onChange = null, className = '', ...rest }) => {
  return (
    <div className={`search-box ${className}`} {...rest}>
      <input className="search-box__input" type="text" value={value} onChange={onChange} />
    </div>
  )
}

export default SearchBox
