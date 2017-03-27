import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import {
  CHANGE,
  CLEAR,
  INITIALISE,
} from './actionTypes'

export default handleActions({
  [CHANGE]: (state, { meta, payload }) => state.update(
    meta.form,
    Map(),
    form => form.setIn(meta.name.split('.'), payload.value)),
  [CLEAR]: (state, { meta }) => state.delete(meta),
  [INITIALISE]: (state, { meta, payload }) => state.set(meta, fromJS(payload)),
}, Map())
