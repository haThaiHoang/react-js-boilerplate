import { all } from 'redux-saga/effects'

import account from './account'
import roles from './roles'
import admin from './admin'
import application from './application'
import businessSystem from './business-system'

export default function* sagas() {
  yield all([
    account(),
    roles(),
    admin(),
    application(),
    businessSystem()
  ])
}
