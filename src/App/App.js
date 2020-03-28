import React from 'react';
import Container from '../Container/Container';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';

class App extends React.Component {
  state = {
    active: 'HPQ',
  }

  render() {  
    return (
      <div className="App">
        <Sidebar updater={this.updateActiveStock}/>
        <Container active={this.state.active}/>
      </div>
    );
  }

  updateActiveStock = (event) => {
    this.setState({ 
      active: event.target.id
    });
  }

}

export default App;