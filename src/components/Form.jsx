import { func, node, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'
import { isEqual } from 'helpers'

class Form extends Component {
  static childContextTypes = {
    form: string.isRequired,
  }

  static defaultProps = {
    initialValues: {},
  }

  static displayName = 'Form'

  static propTypes = {
    children: node.isRequired,
    clear: func.isRequired,
    initialise: func.isRequired,
    initialValues: shape(),
    name: string.isRequired,
    onSubmit: func.isRequired,
  }

  getChildContext = () => ({
    form: this.props.name,
  })

  componentDidMount = () => {
    this.initialise(this.props.initialValues)
  }

  componentWillReceiveProps = ({ initialValues: nextValues }) => {
    if (!isEqual(this.props.initialValues, nextValues)) {
      this.initialise(nextValues)
    }
  }

  componentWillUnmount = () => {
    this.props.clear(this.props.name)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit()
  }

  initialise = values => {
    this.props.initialise({
      form: this.props.name,
      ...values,
    })
  }

  render = () =>
    <form name={this.props.name} onSubmit={this.handleSubmit}>
      {this.props.children}
    </form>
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(Form)
