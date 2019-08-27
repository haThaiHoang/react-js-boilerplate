import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { login, getAccountInfo } from '@/api/account'

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
