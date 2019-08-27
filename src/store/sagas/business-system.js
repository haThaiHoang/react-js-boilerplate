import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import { TYPES } from 'app/store/actions'
import { getBusinessSystem } from 'app/api/business-system'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_BUSINESS_SYSTEM, sagaHelper({
      api: getBusinessSystem
    }))
  ])
}
