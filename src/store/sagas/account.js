import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { login } from '@/api/account'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.LOGIN, sagaHelper({
      api: login
    }))
  ])
}
