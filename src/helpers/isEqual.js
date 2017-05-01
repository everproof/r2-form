import { fromJS, is } from 'immutable'

export default (first, second) => is(fromJS(first), fromJS(second))
