import React, { Component, PropTypes } from 'react'
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
    change: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    children: PropTypes.node,
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    form: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
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
      type,
      value,
    } = this.props

    return (
      <FieldComponent
        checked={checked}
        id={`${form}-${name}`}
        name={name}
        onChange={this.handleChange}
        placeholder={placeholder}
        type={type}
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

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default withFormContext(connect(mapStateToProps, mapDispatchToProps)(Field))
