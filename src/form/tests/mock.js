import { fromJS, Map } from 'immutable'

export const undefinedState = undefined // eslint-disable-line no-undefined
export const initialState = Map()
export const checkboxUpdateState = fromJS({
  form: {
    checkbox: ['checked'],
  },
})
