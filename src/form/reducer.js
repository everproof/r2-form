import { fromJS, List, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { CHANGE, CLEAR, INITIALISE, LIST_ADD } from './actionTypes'

function change(formState, { index, isCheckbox, name }, { checked, value }) {
  function updateInput() {
    function updateCheckboxList(values) {
      return checked
        ? values.push(value)
        : values.filterNot(val => val === value)
    }

    function updateSingleValue() {
      return isCheckbox
        ? formState.setIn(name.split('.'), checked)
        : formState.setIn(name.split('.'), value)
    }

    const isCheckboxList =
      isCheckbox && List.isList(formState.getIn(name.split('.')))

    return isCheckboxList
      ? formState.updateIn(name.split('.'), List(), updateCheckboxList)
      : updateSingleValue()
  }

  function updateInputList() {
    return formState.updateIn(name.split('.'), List(), values =>
      values.set(index, value),
    )
  }

  return index ? updateInputList() : updateInput()
}

export default handleActions(
  {
    [CHANGE]: (state, { meta, payload }) =>
      state.update(meta.form, Map(), formState =>
        change(formState, meta, payload),
      ),
    [CLEAR]: (state, { meta: { form } }) => state.delete(form),
    [INITIALISE]: (state, { meta: { form }, payload }) =>
      state.set(form, fromJS(payload)),
    [LIST_ADD]: (state, { meta: { form, name } }) =>
      state.updateIn([form, ...name.split('.')], List(), values =>
        values.push(''),
      ),
  },
  Map(),
)
