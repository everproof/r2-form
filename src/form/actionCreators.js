import { get, omit } from 'lodash'
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
  ({ form: { name: form }, name }) => ({
    form,
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
  payload => omit(payload, ['form']),
  payload => ({
    form: get(payload, ['form']),
  }))

export const listAdd = createAction(
  LIST_ADD,
  () => {},
  ({ form, name }) => ({
    form,
    name,
  }))
