import React from 'react'
import '../stylesheets/card.css'
import Stat from './Stat'

const Card = (props) => {
  return (
    <div className='container'>
        <div className='title-container'>
          <div className='title'>{props.name}</div>
        </div>
        <div className='image-container'>
          <img src={props.img} alt="Pokemon Image" />
        </div>
        <div className='stats'>
          <Stat attack={true} value={props.attack} />
          <Stat attack={false} value={props.defense} />
        </div>
    </div>
  )
}

export default Card