import React from 'react';
import Coin from '../Coin/Coin';
import ValueCoin from '../ValueCoin/ValueCoin';
import ContainerTab from '../ContainerTab/ContainerTab';
import './Container.css';

class Container extends React.Component {

  constructor(props) {
    super();
    this.state = {
      nameStocks: props.active,
      valueStocks: null,
    }
  }



  fetchInfo = () => {
    console.log(this.state.isLoaded)
    if(this.state.isLoaded) {
      console.log("fetching info...")
      fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${this.state.nameStocks}`)
      .then(res => res.json())
      .then(result => {
        console.log(result.price)
        this.setState({
          isLoaded: false,
          valueStocks: result.price,
        });
      },
      (error) => {
        this.setState({
          //isLoaded:,
          error
        });
      }
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
              <ValueCoin value={this.state.valueStocks}/>
          </div>
        </div>
      </div>
      );
  }
}

export default Container;

//https://financialmodelingprep.com/developer/docs/#Stock-Price