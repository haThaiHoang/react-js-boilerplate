import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from 'app/utils/saga-helper'
import { TYPES } from 'app/store/actions'
import { getAllAdmin, deleteAdmin, addSubAdmin, updateAdmin } from 'app/api/admin'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_ALL_ADMIN, sagaHelper({
      api: getAllAdmin
    })),
    takeLatest(TYPES.DELETE_ADMIN, sagaHelper({
      api: deleteAdmin
    })),
    takeLatest(TYPES.ADD_SUB_ADMIN, sagaHelper({
      api: addSubAdmin
    })),
    takeLatest(TYPES.UPDATE_ADMIN, sagaHelper({
      api: updateAdmin
    }))
  ])
}
