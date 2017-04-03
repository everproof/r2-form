import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'form/actionCreators'

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
    component: PropTypes.element.isRequired,
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

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper

// export default (WrappedComponent) => {
//   class Field extends Component {
//     static propTypes = {
//       change: PropTypes.func.isRequired,
//     }

//     handleChange = ({ target }) => {
//       this.props.change(target)
//     }

//     render = () => <WrappedComponent onChange={this.handleChange} {...this.props} />
//   }

//   const mapStateToProps = ({ form: formState }, { form, name, value }) => ({
//     value: value
//       ? value
//       : formState.getIn([form, ...name.split('.')]),
//   })

//   const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

//   const ConnectedField = connect(mapStateToProps, mapDispatchToProps)(Field)

//   function FieldWrapper (props, { form }) {
//     return <ConnectedField {...props} form={form} />
//   }

//   FieldWrapper.contextTypes = {
//     form: PropTypes.string.isRequired,
//   }

//   return FieldWrapper
// }
