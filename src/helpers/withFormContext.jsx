import { string } from 'prop-types'
import React from 'react'

export default function withFormContext(WrappedComponent) {
  const ComponentWrapper = (props, { form }) => (
    <WrappedComponent {...props} form={props.form || form} />
  )

  ComponentWrapper.contextTypes = {
    form: string.isRequired,
  }

  ComponentWrapper.defaultProps = {
    form: null,
  }

  ComponentWrapper.displayName = `${WrappedComponent.displayName}WithFormContext`

  ComponentWrapper.propTypes = {
    form: string,
  }

  return ComponentWrapper
}
