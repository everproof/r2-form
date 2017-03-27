import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'

export default (WrappedComponent) => {
  class Field extends Component {
    static contextTypes = {
      form: PropTypes.string.isRequired,
    }

    static propTypes = {
      change: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }

    handleChange = ({ target }) => {
      this.props.change(target)
    }

    render = () => <WrappedComponent {...this.props} onChange={this.handleChange} value={value} />
  }

  const mapStateToProps = ({ form }, { name, value }) => ({
    value: value
      ? value
      :
  })

  const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

  return connect(null, mapDispatchToProps)(Field)
}
