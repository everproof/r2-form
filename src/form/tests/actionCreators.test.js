import {
  change,
  clear,
  initialise,
} from 'form/actionCreators'
import {
  CHANGE,
  CLEAR,
  INITIALISE,
} from 'form/actionTypes'

describe('testing action creators', () => {
  test('should create an action to change a form field value', () => {
    const target = {
      checked: false,
      form: {
        name: 'form',
      },
      name: 'name',
      value: 'value',
    }

    expect(change(target)).toEqual({
      type: CHANGE,
      payload: {
        checked: target.checked,
        value: target.value,
      },
      meta: {
        form: target.form.name,
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

    expect(initialise({
      ...payload,
      form,
    })).toEqual({
      type: INITIALISE,
      payload,
      meta: {
        form,
      },
    })
  })
})
