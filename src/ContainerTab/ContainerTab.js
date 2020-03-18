import React from 'react';
import './ContainerTab.css';

const ContainerTab = props => {
  return (
    <div className="container__tab" onClick={props.onClick}>
      <span>{props.children}</span>
    </div>
  );
}

export default ContainerTab;


//https://financialmodelingprep.com/api/v3/stock/real-time-price