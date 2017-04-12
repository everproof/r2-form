import { fromJS, List, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import {
  CHANGE,
  CLEAR,
  INITIALISE,
  LIST_ADD,
} from './actionTypes'

function change (formState, { index, isCheckbox, name }, { checked, value }) {
  function updateInput () {
    function updateCheckbox (values) {
      return checked
        ? values.push(value)
        : values.filterNot(val => val === value)
    }

    return isCheckbox
      ? formState.updateIn(name.split('.'), List(), updateCheckbox)
      : formState.setIn(name.split('.'), value)
  }

  function updateInputList () {
    return formState.updateIn(name.split('.'), List(), values => values.set(index, value))
  }

  return index ? updateInputList() : updateInput()
}

export default handleActions({
  [CHANGE]: (state, { meta, payload }) => state.update(
    meta.form,
    Map(),
    formState => change(formState, meta, payload)
  ),
  [CLEAR]: (state, { meta: { form } }) => state.delete(form),
  [INITIALISE]: (state, { meta: { form }, payload }) => state.set(form, fromJS(payload)),
  [LIST_ADD]: (state, { meta: { form, name } }) => state.updateIn(
    [form, ...name.split('.')],
    List(),
    values => values.push('')),
}, Map())
