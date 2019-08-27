import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import { TYPES } from 'app/store/actions'
import { login, getAccountInfo } from 'app/api/account'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.LOGIN, sagaHelper({
      api: login
    })),
    takeLatest(TYPES.GET_ACCOUNT_INFO, sagaHelper({
      api: getAccountInfo
    }))
  ])
}
