import { fromJS, List, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import {
  CHANGE,
  CLEAR,
  INITIALISE,
  LIST_ADD,
} from './actionTypes'

export default handleActions({
  [CHANGE]: (state, { meta: { form, index, name }, payload: { value } }) => state.update(
    form,
    Map(),
    formState => index
        ? formState.updateIn(
            name.split('.'),
            List(),
            values => values.set(index, value)
          )
        : formState.setIn(name.split('.'), value)
    ),
  [CLEAR]: (state, { meta: { form } }) => state.delete(form),
  [INITIALISE]: (state, { meta: { form }, payload }) => state.set(form, fromJS(payload)),
  [LIST_ADD]: (state, { meta: { form, name } }) => state.updateIn(
    [form, ...name.split('.')],
    List(),
    values => values.push('')),
}, Map())
