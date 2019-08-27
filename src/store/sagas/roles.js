import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { getRoles, addRole, updateRole, deleteRole, getPermissions } from '@/api/roles'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_ROLES, sagaHelper({
      api: getRoles
    })),
    takeLatest(TYPES.ADD_ROLE, sagaHelper({
      api: addRole
    })),
    takeLatest(TYPES.DELETE_ROLE, sagaHelper({
      api: deleteRole
    })),
    takeLatest(TYPES.GET_PERMISSIONS, sagaHelper({
      api: getPermissions
    })),
    takeLatest(TYPES.UPDATE_ROLE, sagaHelper({
      api: updateRole
    }))
  ])
}
