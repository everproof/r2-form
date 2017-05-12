import { is } from 'immutable'

import fromJSGreedy from 'immutable/utils/fromJSGreedy'

export default (first, second) => is(fromJSGreedy(first), fromJSGreedy(second))
