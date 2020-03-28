import React from 'react'
import './Logo.css'
import PropTypes from 'prop-types'

class Logo extends React.Component {
  render () {
    return (
      <div className="logo">
        { this.imageExists(`${this.props.stockName}.svg`)
          ? <img className="logo__img" src={`${this.props.stockName}.svg`} alt={this.props.stockName}/>
          : <AutoLogo text={this.props.stockName} />
        }
      </div>
    )
  }

  imageExists = imageUrl => {
    var http = new XMLHttpRequest()
    http.open('HEAD', imageUrl, false)
    http.send()

    return http.status !== 404
  }
}

const AutoLogo = props => {
  return (
    <div className="logo__img auto-logo">
      {props.text}
    </div>
  )
}

AutoLogo.propTypes = {
  text: PropTypes.string
}

Logo.propTypes = {
  stockName: PropTypes.string
}

export default Logo
