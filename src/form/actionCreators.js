import { get, omit, pick } from 'lodash'
import { createAction } from 'redux-actions'

import {
  CHANGE,
  CLEAR,
  INITIALISE,
} from './actionTypes'

export const change = createAction(
  CHANGE,
  target => pick(target, ['checked', 'value']),
  target => pick(target, ['form', 'name']))

export const clear = createAction(
  CLEAR,
  () => {},
  form => form)

export const initialise = createAction(
  INITIALISE,
  payload => omit(payload, ['form']),
  payload => get(payload, ['form']))
