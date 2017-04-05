import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'
import { getNameAndIndexFromInputName, withFormContext } from 'helpers'

class Field extends Component {
  static defaultProps = {
    checked: false,
    children: null,
    placeholder: '',
  }

  static displayName = 'Field'

  static propTypes = {
    change: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    children: PropTypes.node,
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    form: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  handleChange = ({ target }) => {
    this.props.change(target)
  }

  render = () => {
    const {
      checked,
      children,
      component: FieldComponent,
      form,
      name,
      placeholder,
      value,
    } = this.props

    return (
      <FieldComponent
        checked={checked}
        id={`${form}-${name}`}
        name={name}
        onChange={this.handleChange}
        placeholder={placeholder}
        value={value}
      >
        {children}
      </FieldComponent>
    )
  }
}

const getInputValueFromList = (values, index) => values && values.get(index)

const getInputValueFromState = (formState, form, inputName) => {
  const { index, name } = getNameAndIndexFromInputName(inputName)
  const values = formState.getIn([form, ...name.split('.')])

  return index
    ? getInputValueFromList(values, index)
    : values
}

const getInputValue = (formState, { form, name, value }) =>
  value ? value : getInputValueFromState(formState, form, name)

const mapStateToProps = ({ form: formState }, props) => ({
  value: getInputValue(formState, props),
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default withFormContext(connect(mapStateToProps, mapDispatchToProps)(Field))
