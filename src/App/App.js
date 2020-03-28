import React from 'react'
import Container from '../Container/Container'
import './App.css'
import Sidebar from '../Sidebar/Sidebar'

class App extends React.Component {
  state = {
    currentStock: 'AAPL'
  }

  render () {
    return (
      <div className="App">
        <Sidebar updater={this.updateActiveStock}/>
        <Container activeStock={this.state.currentStock} updater={this.updateActiveStock}/>
      </div>
    )
  }

  updateActiveStock = stockName => this.setState({ currentStock: stockName })
}

export default App
