import React from 'react';

const ValueCoin = props => {
    return (
        <div className="valuecoin">
          <span className="valuecoint__value">{props.value}</span>
        </div>
      )
}

export default ValueCoin;