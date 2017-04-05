import { fromJS, Map } from 'immutable'
import * as immutableMatchers from 'jest-immutable-matchers'

import form from 'form'
import { change, clear, initialise, listAdd } from 'form/actionCreators'

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
      items: ['one'],
    }))).toEqualImmutable(fromJS({
      form: {
        name: 'name',
        age: 15,
        items: ['one'],
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

  test('should update the value of a list field', () => {
    const target = {
      checked: false,
      form: {
        name: 'form',
      },
      name: 'items[0]',
      value: 'new',
    }

    expect(form(initialState, change(target))).toEqualImmutable(fromJS({
      form: {
        items: [target.value],
      },
    }))
  })

  test('should add an empty value to a list field', () => {
    const meta = {
      form: 'form',
      name: 'name',
    }

    expect(form(initialState, listAdd(meta))).toEqualImmutable(fromJS({
      form: {
        name: [''],
      },
    }))
  })

  test('should clear an existing form', () => {
    const formName = 'form'

    expect(form(initialState.set(formName, Map()), clear(formName)))
      .toEqualImmutable(initialState)
  })
})
