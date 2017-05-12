import { Map, Set } from 'immutable'
import * as immutableMatchers from 'jest-immutable-matchers'

import fromJSGreedy from 'immutable/utils/fromJSGreedy'

describe('testing fromJSGreedy', () => {
  beforeEach(() => jest.addMatchers(immutableMatchers))

  test('should return null', () => {
    expect(fromJSGreedy(null)).toBe(null)
  })

  test('should return undefined', () => {
    expect(fromJSGreedy()).toBe(undefined) // eslint-disable-line no-undefined
  })

  test('should return a string', () => {
    expect(fromJSGreedy('test')).toBe('test')
  })

  test('should return a number', () => {
    const one = 1

    expect(fromJSGreedy(one)).toBe(one)
  })

  test('should return an empty Set', () => {
    expect(fromJSGreedy([])).toEqualImmutable(Set())
  })

  test('should return an empty Map', () => {
    expect(fromJSGreedy({})).toEqualImmutable(Map())
  })

  test('should return a Set of Maps with Sets', () => {
    const firstId = 0
    const secondId = 1
    const first = {
      identifier: firstId,
      name: 'Test 1',
      fkIds: [firstId, secondId],
    }
    const second = {
      identifier: secondId,
      name: 'Test 2',
      fkIds: [firstId, secondId],
    }
    const objs = [first, second]

    expect(fromJSGreedy(objs)).toEqualImmutable(
      Set([
        Map({
          identifier: first.identifier,
          name: first.name,
          fkIds: Set(first.fkIds),
        }),
        Map({
          identifier: second.identifier,
          name: second.name,
          fkIds: Set(second.fkIds),
        }),
      ]),
    )
  })
})
