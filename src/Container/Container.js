import React from 'react';
import Coin from '../Coin/Coin';
import ContainerTab from '../ContainerTab/ContainerTab';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import './Container.css';

class Container extends React.Component {

  constructor(props) {
    super();
    this.state = {
      nameStocks: props.active,
      valueStocks: null,
      historicValue: []
    }
  }



  fetchInfo = () => {
    if(this.state.isLoaded) {
      fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${this.state.nameStocks}`)
      .then(res => res.json())
      .then(
        result => { this.setState({ isLoaded: false, valueStocks: result.price }); },
        error => { this.setState({ error }); }
      )
      fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.state.nameStocks}?serietype=line`)
      .then(res => res.json())
      .then(
        result => {
          const data = result.historical.map(x => ({ name: x.date, value: x.close }));
          this.setState({ historicValue: data})
        },
        error => { this.setState({ error }); }
      )
    }
  }

  componentDidMount() {
    this.fetchInfo();
    this.setState({
      isLoaded: true,
    })
  }

  componentDidUpdate() {
    this.fetchInfo();
  }

  containerTabClickHandler = (stocks) => {
    this.setState({nameStocks: stocks,
      isLoaded: true,
    })
  }
  
  render() {
    return (
      <div className="container">
        <div className="container__tabs">
          <ContainerTab onClick={() => this.containerTabClickHandler("AAPL")}>Apple</ContainerTab>
          <ContainerTab onClick={() => this.containerTabClickHandler("FCA")}>Fiat</ContainerTab>
          <ContainerTab onClick={() => this.containerTabClickHandler("GM")}>General Motors</ContainerTab>
        </div>
        <div className="container__main">
          <div className="narrow"> 
              <Coin imageURL={this.state.nameStocks+".svg"}/>
          </div>
          <div className="wide"> 
            <div className="valuecoin">
              <span className="valuecoin__value">{this.state.valueStocks}</span>
            </div>

          </div>
        </div>
        <LineChart width={500} height={300} data={this.state.historicValue}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
      </div>
      );
  }
}

export default Container;

//https://financialmodelingprep.com/developer/docs/#Stock-Price