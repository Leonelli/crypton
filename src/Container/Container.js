import React from 'react'
import Coin from '../Coin/Coin'
import ContainerTab from '../ContainerTab/ContainerTab'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import PropTypes from 'prop-types'
import './Container.css'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nameStocks: props.active,
      valueStocks: null,
      historicValue: [],
      minValue: null,
      maxValue: null
    }
  }

  fetchInfo = () => {
    fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${this.props.active}`)
      .then(res => res.json())
      .then(
        result => { this.setState({ isLoaded: false, valueStocks: result.price }) },
        error => { this.setState({ error }) }
      )
    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.active}?serietype=line`)
      .then(res => res.json())
      .then(
        result => {
          const data = result.historical.map(x => ({ name: x.date, value: x.close }))
          let min = +Infinity
          let max = -Infinity
          data.forEach(element => {
            if (element.value < min) {
              min = element.value
            }
            if (element.value > max) {
              max = element.value
            }
          })
          this.setState({
            historicValue: data,
            minValue: min,
            maxValue: max
          })
        },
        error => { this.setState({ error }) }
      )
  }

  componentDidMount () {
    this.fetchInfo()
    // this.setState({
    //   isLoaded: true,
    // })
  }

  componentDidUpdate (prevState, prevProps) {
    if (prevState) {
      this.fetchInfo()
    }
  }

  containerTabClickHandler = (stocks) => {
    this.setState({
      nameStocks: stocks,
      isLoaded: true
    })
  }

  render () {
    return (
      <div className="container">
        <div className="container__tabs">
          <ContainerTab onClick={() => this.containerTabClickHandler('AAPL')}>Apple</ContainerTab>
          <ContainerTab onClick={() => this.containerTabClickHandler('FCAU')}>Fiat</ContainerTab>
          <ContainerTab onClick={() => this.containerTabClickHandler('GM')}>General Motors</ContainerTab>
        </div>
        <div className="container__main">
          <div className="narrow">
            <Coin imageURL={`${this.state.nameStocks}.svg`}/>
          </div>
          <div className="wide">
            <div className="valuecoin">
              <p className="valuecoin__value">Current value: {this.state.valueStocks}</p>
              <p className="valuecoin__value">Min value: {this.state.minValue}</p>
              <p className="valuecoin__value">Max value: {this.state.maxValue}</p>
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
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </div>
    )
  }
}

export default Container

Container.propTypes = {
  active: PropTypes.string
}
