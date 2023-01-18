import React from 'react'
import '../stylesheets/stat.css'

const Stat = (props) => {
  return (
    <div className={props.attack ? 'stat-container attack': 'stat-container'}>{props.value}</div>
  )
}

export default Stat