import { omit } from 'lodash-es'
import { createAction } from 'redux-actions'

import { getNameAndIndexFromInputName } from 'helpers'

import { CHANGE, CLEAR, INITIALISE, LIST_ADD } from './actionTypes'

export const change = createAction(
  CHANGE,
  ({ checked, value }) => ({
    checked,
    value,
  }),
  ({ form: { name: form }, name, type }) => ({
    form,
    isCheckbox: type === 'checkbox',
    ...getNameAndIndexFromInputName(name),
  }),
)

export const clear = createAction(
  CLEAR,
  () => {},
  form => ({
    form,
  }),
)

export const initialise = createAction(
  INITIALISE,
  payload => omit(payload, 'form'),
  ({ form }) => ({
    form,
  }),
)

export const listAdd = createAction(
  LIST_ADD,
  () => {},
  ({ form, name }) => ({
    form,
    name,
  }),
)
