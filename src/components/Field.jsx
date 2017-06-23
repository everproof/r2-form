import { bool, element, func, node, oneOfType, string } from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List } from 'immutable'

import * as actionCreators from 'form/actionCreators'
import { getNameAndIndexFromInputName, withFormContext } from 'helpers'

class Field extends Component {
  static defaultProps = {
    checked: false,
    children: null,
    placeholder: '',
    type: null,
  }

  static displayName = 'Field'

  static propTypes = {
    change: func.isRequired,
    checked: bool,
    children: node,
    component: oneOfType([element, func, string]).isRequired,
    form: string.isRequired,
    name: string.isRequired,
    type: string,
    value: string.isRequired,
  }

  handleChange = ({ target }) => {
    this.props.change(target)
  }

  render = () => {
    const {
      checked,
      children,
      component: FieldComponent,
      name,
      type,
      value,
      ...rest
    } = this.props

    return (
      <FieldComponent
        checked={checked}
        name={name}
        onChange={this.handleChange}
        type={type}
        value={value}
        {...rest}
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

  return index ? getInputValueFromList(values, index) : values
}

const getValueFromArray = (stateValue, value) => {
  const NOT_FOUND = -1

  if (stateValue && List.isList(stateValue)) {
    return stateValue.indexOf(value) !== NOT_FOUND
  }

  return Boolean(stateValue)
}

const mapStateToProps = ({ form: formState }, { form, name, type, value }) => {
  const stateValue = getInputValueFromState(formState, form, name)

  return {
    checked: type === 'checkbox' ? getValueFromArray(stateValue, value) : null,
    value: value ? value : stateValue,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default withFormContext(
  connect(mapStateToProps, mapDispatchToProps)(Field),
)
