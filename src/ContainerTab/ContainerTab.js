import React from 'react'
import './ContainerTab.css'
import PropTypes from 'prop-types'

const ContainerTab = props => {
  return (
    <div className="container__tab" onClick={props.onClick}>
      <span>{props.children}</span>
    </div>
  )
}

ContainerTab.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string
}

export default ContainerTab
