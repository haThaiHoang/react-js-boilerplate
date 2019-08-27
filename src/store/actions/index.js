import lodash from 'lodash'

import types from './types'

const TYPES = lodash.reduce(types, (map, value) => {
  map[value] = value
  map[`${value}_REQUEST`] = `${value}_REQUEST`
  map[`${value}_SUCCESS`] = `${value}_SUCCESS`
  map[`${value}_FAILURE`] = `${value}_FAILURE`

  return map
}, {})

const actions = lodash.reduce(types, (map, value) => {
  map[lodash.camelCase(value)] = (data, callback) => ({
    type: value,
    data,
    callback
  })

  return map
}, {})

export {
  TYPES,
  actions
}

export default actions
