import { Seq } from 'immutable'

export default function fromJSGreedy (js) {
  function convert (obj) {
    return Array.isArray(obj)
      ? Seq(obj).map(fromJSGreedy).toSet()
      : Seq(obj).map(fromJSGreedy).toMap()
  }

  function isObject (obj) {
    return Boolean(obj) && typeof obj === 'object'
  }

  return isObject(js) ? convert(js) : js
}
