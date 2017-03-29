import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'

export default (WrappedComponent) => {
  class Field extends Component {
    static propTypes = {
      change: PropTypes.func.isRequired,
    }

    handleChange = ({ target }) => {
      this.props.change(target)
    }

    render = () => <WrappedComponent onChange={this.handleChange} {...this.props} />
  }

  const mapStateToProps = ({ form: formState }, { form, name, value }) => ({
    value: value
      ? value
      : formState.getIn([form, ...name.split('.')]),
  })

  const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

  const ConnectedField = connect(mapStateToProps, mapDispatchToProps)(Field)

  function FieldWrapper (props, { form }) {
    return <ConnectedField {...props} form={form} />
  }

  FieldWrapper.contextTypes = {
    form: PropTypes.string.isRequired,
  }

  return FieldWrapper
}
