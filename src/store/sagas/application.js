import { all, takeLatest } from 'redux-saga/effects'
import lodash from 'lodash'

import Notification from '@/utils/notification'
import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import {
  getCountries,
  getApplications,
  updateApplication,
  moveApplications,
  sendMailWrongPassport,
  getSendMailLog
} from '@/api/application'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_COUNTRIES, sagaHelper({
      api: getCountries
    })),
    takeLatest(TYPES.GET_APPLICATIONS, sagaHelper({
      api: getApplications
    })),
    takeLatest(TYPES.UPDATE_APPLICATION, sagaHelper({
      api: updateApplication,
      errorHandler: (e, getLocalizeErrorMessages) => {
        if (lodash.isArray(e.message)) {
          e.message.forEach((item) => {
            if (item.name) {
              Notification.error(getLocalizeErrorMessages(item.name) || item.name)
            } else {
              Notification.error(`${item.field}: ${getLocalizeErrorMessages(item.message) || item.message}`)
            }
          })
        } else {
          Notification.error(getLocalizeErrorMessages(e.name) || e.name)
        }
      }
    })),
    takeLatest(TYPES.MOVE_APPLICATIONS, sagaHelper({
      api: moveApplications
    })),
    takeLatest(TYPES.SEND_MAIL_WRONG_PASSPORT, sagaHelper({
      api: sendMailWrongPassport,
      successMessage: 'Send mail successfully'
    })),
    takeLatest(TYPES.GET_SEND_MAIL_LOG, sagaHelper({
      api: getSendMailLog
    }))
  ])
}
