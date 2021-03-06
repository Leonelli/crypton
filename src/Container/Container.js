import React from 'react'
import Logo from '../Logo/Logo'
import ContainerTab from '../ContainerTab/ContainerTab'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import PropTypes from 'prop-types'
import './Container.css'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valueStocks: null,
      historicValue: [],
      minValue: null,
      maxValue: null
    }
  }

  fetchInfo = () => {
    fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${this.props.activeStock}`)
      .then(res => res.json())
      .then(
        result => { this.setState({ valueStocks: result.price }) },
        error => { this.setState({ error }) }
      )
    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.props.activeStock}?serietype=line`)
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
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.activeStock !== this.props.activeStock) {
      this.fetchInfo()
    }
  }

  render () {
    return (
      <div className="container">
        <div className="container__tabs">
          <ContainerTab onClick={() => this.props.updater('AAPL')}>Apple</ContainerTab>
          <ContainerTab onClick={() => this.props.updater('FCAU')}>Fiat</ContainerTab>
          <ContainerTab onClick={() => this.props.updater('GM')}>General Motors</ContainerTab>
        </div>
        <div className="container__main">
          <div className="narrow">
            <Logo stockName={this.props.activeStock} />
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

Container.propTypes = {
  activeStock: PropTypes.string,
  updater: PropTypes.func
}

export default Container
