// Need to be able to add and remove from arrays (i.e. checkboxes)
// Also enable multiple inputs controlling one value array

import {
  CHANGE,
  CLEAR,
} from 'form/actionTypes'

function testActionTypeIsDefined (actionType, actionValue) {
  test(`${actionValue} should be defined`, () => {
    expect(actionType).toBe(actionValue)
  })
}

describe('testing action types', () => {
  testActionTypeIsDefined(CHANGE, 'CHANGE')
  testActionTypeIsDefined(CLEAR, 'CLEAR')
})
