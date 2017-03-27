import { isEqual } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'

export default ({ form = 'form' }) => (WrappedComponent) => {
  class Form extends Component {
    static childContextTypes = {
      form: PropTypes.string.isRequired,
    }

    static propTypes = {
      clear: PropTypes.func.isRequired,
      initialise: PropTypes.func.isRequired,
      initialValues: PropTypes.shape().isRequired,
    }

    getChildContext = () => form

    componentDidMount = () => {
      this.props.initialise(form, this.props.initialValues)
    }

    componentWillReceiveProps = (nextProps) => {
      if (nextProps) {
        if (isEqual(this.props.initialValues, nextProps.initialValues)) {
          this.props.initialise(nextProps.initialValues)
        }
      }
    }

    componentWillUnmount = () => {
      this.props.clear(form)
    }

    render = () => (
      <form name={form}>
        <WrappedComponent {...this.props} />
      </form>
    )
  }

  const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

  return connect(null, mapDispatchToProps)(Form)
}
