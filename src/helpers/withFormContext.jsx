import React, { PropTypes } from 'react'

export default function withFormContext (WrappedComponent) {
  const ComponentWrapper = (props, { form }) =>
    <WrappedComponent {...props} form={props.form || form} />

  ComponentWrapper.contextTypes = {
    form: PropTypes.string.isRequired,
  }

  ComponentWrapper.defaultProps = {
    form: null,
  }

  ComponentWrapper.displayName = `${WrappedComponent.displayName}WithFormContext`

  ComponentWrapper.propTypes = {
    form: PropTypes.string,
  }

  return ComponentWrapper
}
