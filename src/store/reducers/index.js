import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { localizeReducer } from 'react-localize-redux'

import ui from './ui'
import account from './account'
import roles from './roles'
import admin from './admin'
import application from './application'
import businessSystem from './business-system'

const appReducer = history => combineReducers({
  router: connectRouter(history),
  localize: localizeReducer,
  ui,
  account,
  roles,
  admin,
  application,
  businessSystem
})

export default history => (state, action) => {
  if (
    action.type === '@@router/LOCATION_CHANGE'
    && action.payload.location.pathname === '/login'
    && action.payload.action === 'PUSH'
  ) {
    state = {
      localize: state.localize
    }
  }

  return appReducer(history)(state, action)
}
