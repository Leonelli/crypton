import React from 'react';
import './Sidebar.css';
import { Icon } from 'semantic-ui-react'

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        stockList: [],
        isSidebarOpen: false
    }
  }

  render = () => {  
    const listItems =this.state.stockList.map((x, i) => {
      return (<div className="sidebar__item" 
        id={x.symbol} 
        key={i} 
        onClick={e => this.props.updater(e)}>
        {x.name}
      </div>);
    })
    return (
      <aside>
        <div className="sidebar__buttons">
          <Icon name="bars" size="big" onClick={this.menuButtonClickHandler}/>
        </div>
        <div className="sidebar">
          <h3 className="sidebar__title">Stock List</h3>
          {listItems}
        <Icon name="close" size="big" onClick={this.menuButtonClickHandler}/>
        </div>
      </aside>
    )
  }

  componentDidMount() {
      this.fetchInfo();
  }

  menuButtonClickHandler = event => {
    const sidebar = document.querySelector('.sidebar');
    const buttonsContainer = document.querySelector('.sidebar__buttons');
     if (this.state.isSidebarOpen) {
       sidebar.classList.remove('sidebar--open');
       buttonsContainer.style.display = 'block';
       this.setState({ isSidebarOpen: false });
     }
     else {
        sidebar.classList.add('sidebar--open');
        buttonsContainer.style.display = 'none';
        this.setState({ isSidebarOpen: true })
     }
    
  }

  listItemClickHandler = event => {
    this.props.updater(event.target.id);
  }

  fetchInfo = () => {
        fetch(`https://financialmodelingprep.com/api/v3/company/stock/list`)
        .then(res => res.json())
        .then(
          result => {  
            let stockList = result.symbolsList.filter(x => x.name)
            this.setState({stockList})
          },
          error => { console.log(error) }
        );
  }
}

export default Sidebar;