import { change, clear, initialise, listAdd } from 'form/actionCreators'
import { CHANGE, CLEAR, INITIALISE, LIST_ADD } from 'form/actionTypes'

describe('testing action creators', () => {
  test('should create an action to change a form field value', () => {
    const target = {
      form: {
        name: 'form',
      },
      name: 'name',
      value: 'value',
    }

    expect(change(target)).toEqual({
      type: CHANGE,
      payload: {
        value: target.value,
      },
      meta: {
        form: target.form.name,
        index: null,
        isCheckbox: false,
        name: target.name,
      },
    })
  })

  test('should create an action to clear a form', () => {
    const form = 'form'

    expect(clear(form)).toEqual({
      type: CLEAR,
      meta: {
        form,
      },
    })
  })

  test('should create an action to initialise a form', () => {
    const form = 'form'
    const payload = {
      name: 'name',
    }

    expect(
      initialise({
        ...payload,
        form,
      }),
    ).toEqual({
      type: INITIALISE,
      payload,
      meta: {
        form,
      },
    })
  })

  test('should create an action to add to a value list', () => {
    const meta = {
      form: 'form',
      name: 'name',
    }

    expect(
      listAdd({
        ...meta,
      }),
    ).toEqual({
      type: LIST_ADD,
      meta,
    })
  })
})
