import { isEqual } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'

class Form extends Component {
  static childContextTypes = {
    form: PropTypes.string.isRequired,
  }

  static defaultProps = {
    initialValues: {},
  }

  static displayName = 'Form'

  static propTypes = {
    children: PropTypes.node.isRequired,
    clear: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialise: PropTypes.func.isRequired,
    initialValues: PropTypes.shape(),
    name: PropTypes.string.isRequired,
  }

  getChildContext = () => ({
    form: this.props.name,
  })

  componentDidMount = () => {
    this.initialise(this.props.initialValues)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps
      && this.props.initialValues
      && nextProps.initialValues
      && !isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.initialise(nextProps.initialValues)
    }
  }

  componentWillUnmount = () => {
    this.props.clear(this.props.name)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit()
  }

  initialise = (values) => {
    this.props.initialise({
      form: this.props.name,
      ...values,
    })
  }

  render = () => (
    <form name={this.props.name} onSubmit={this.handleSubmit}>
      {this.props.children}
    </form>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(Form)
