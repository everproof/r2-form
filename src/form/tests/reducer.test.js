import { fromJS, Map } from 'immutable'
import * as immutableMatchers from 'jest-immutable-matchers'

import form from 'form'
import { change, clear, initialise } from 'form/actionCreators'

import {
  initialState,
  undefinedState,
} from './mock'

describe('testing reducer', () => {
  beforeEach(() => jest.addMatchers(immutableMatchers))

  test('should return initial state', () => {
    expect(form(undefinedState, {})).toEqualImmutable(initialState)
  })

  test('should load object into form', () => {
    expect(form(initialState, initialise({
      form: 'form',
      name: 'name',
      age: 15,
    }))).toEqualImmutable(fromJS({
      form: {
        name: 'name',
        age: 15,
      },
    }))
  })

  test('should update value of field', () => {
    const target = {
      checked: false,
      form: {
        name: 'form',
      },
      name: 'name',
      value: 'value',
    }

    expect(form(initialState, change(target))).toEqualImmutable(fromJS({
      form: {
        [target.name]: target.value,
      },
    }))
  })

  test('should clear an existing form', () => {
    const formName = 'form'

    expect(form(initialState.set(formName, Map()), clear(formName)))
      .toEqualImmutable(initialState)
  })
})
