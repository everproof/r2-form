import { createAction } from 'redux-actions'

import { getNameAndIndexFromInputName } from 'helpers'

import {
  CHANGE,
  CLEAR,
  INITIALISE,
  LIST_ADD,
} from './actionTypes'

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
  }))

export const clear = createAction(
  CLEAR,
  () => {},
  form => ({
    form,
  }))

export const initialise = createAction(
  INITIALISE,
  ({ form, ...payload }) => payload,
  payload => ({
    form: payload.form,
  }))

export const listAdd = createAction(
  LIST_ADD,
  () => {},
  ({ form, name }) => ({
    form,
    name,
  }))
