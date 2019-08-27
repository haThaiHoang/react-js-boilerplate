import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { getBusinessSystem } from '@/api/business-system'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_BUSINESS_SYSTEM, sagaHelper({
      api: getBusinessSystem
    }))
  ])
}
