import React from 'react'
import '../stylesheets/button.css'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.children}</button>
  )
}

export default Button