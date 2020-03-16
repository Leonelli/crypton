import React from 'react';
import Coin from './Coin';
import ValueCoin from './ValueCoin';
import './Container.css';

const Container = props => {
    return (
      <div className="container">
        <div className="narrow"> 
            <Coin imageURL="./bitcoin.svg"/>
        </div>
        <div className="wide"> 
            <ValueCoin value={9999.99} />
        </div>
      </div>
      )
}

export default Container;