import { get, omit } from 'lodash'
import { createAction } from 'redux-actions'

import {
  CHANGE,
  CLEAR,
  INITIALISE,
} from './actionTypes'

export const change = createAction(
  CHANGE,
  ({ checked, value }) => ({
    checked,
    value,
  }),
  ({ form: { name: form }, name }) => ({
    form,
    name,
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
