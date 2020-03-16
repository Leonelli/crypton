import React from 'react';
import './Coin.css';
const Coin = props => {
  return (
    <div className="coin">
      <img className="coin__img" src={props.imageURL} alt={props.imageURL} />
    </div>
  )
}

export default Coin;