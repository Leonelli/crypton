import React from 'react'
import './Sidebar.css'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stockList: [],
      isSidebarOpen: false,
      filter: '',
      items : []
    }
  }

  filterList = (event) => {
    let items = this.state.stockList;
    items = items.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({items: items});
  }

  render = () => {
    const listItems = this.state.items.map((x, i) => {
      return (
      <div className="sidebar__item"
        id={x.symbol}
        key={i}
        onClick={e => this.props.updater(e.target.id)}>
        {x.name}
      </div>)
    })
    return (
      <aside>
        <div className="sidebar__buttons">
          <Icon name="bars" size="big" onClick={this.menuButtonClickHandler}/>
        </div>
        <div className="sidebar">
          <h3 className="sidebar__title">Stock List</h3>
          <input className="sidebar__search-input" type="text" placeholder="Search" onChange={this.filterList}/>
            {listItems}
          <Icon name="close" size="big" onClick={this.menuButtonClickHandler}/>
        </div>
      </aside>
    )
  }

  componentDidMount () {
    this.fetchInfo()
  }

  menuButtonClickHandler = event => {
    const sidebar = document.querySelector('.sidebar')
    const buttonsContainer = document.querySelector('.sidebar__buttons')
    if (this.state.isSidebarOpen) {
      sidebar.classList.remove('sidebar--open')
      buttonsContainer.style.display = 'block'
      this.setState({ isSidebarOpen: false })
    } else {
      sidebar.classList.add('sidebar--open')
      buttonsContainer.style.display = 'none'
      this.setState({ isSidebarOpen: true })
    }
  }

  listItemClickHandler = event => {
    this.props.updater(event.target.id)
  }

  fetchInfo = () => {
    fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
      .then(res => res.json())
      .then(
        result => {
          const stockList = result.symbolsList.filter(x => x.name)
          this.setState({ stockList, items: stockList })
        },
        error => { console.log(error) }
      )
  }
}

Sidebar.propTypes = {
  updater: PropTypes.func
}

export default Sidebar
