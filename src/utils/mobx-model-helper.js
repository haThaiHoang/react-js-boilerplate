import { types, flow, getSnapshot, applySnapshot } from 'mobx-state-tree'
import lodash from 'lodash'

import Notification from '@/components/notification'
import Misc from '@/utils/misc'
import Request from '@/utils/request'
import ERROR_MESSAGE from '@/constants/error-messages'
import { routingStore } from '@/store'
import Storage from './storage'

const Model = types.model('MobxModelHelper', {
  type: types.maybeNull(types.string),
  error: types.frozen()
})
  .actions((self) => ({
    afterCreate() {
      self.INIT_VALUES = getSnapshot(self)
    },

    clear() {
      applySnapshot(self, self.INIT_VALUES)
    },

    request: flow(function* ({
      type,
      api,
      payload,
      onSuccess,
      onError,
      handleError,
      disabledErrorMessage,
      successMessage
    }) {
      if (type) {
        self.type = type
      }
      self.error = null

      let data = null
      let success = false

      try {
        if (api) {
          const result = yield api(payload)

          if (onSuccess) onSuccess(result)

          if (successMessage) {
            Notification.show(successMessage)
          }

          success = true
          data = result
        }
      } catch (e) {
        const error = yield Misc.getErrorJsonBody(e)
        self.error = error
        // eslint-disable-next-line no-console
        console.warn(error)

        if (error.messageCode === 'TOKEN_INVALID') {
          Request.removeAccessToken()
          Storage.remove('ACCESS_TOKEN')
          routingStore.replace('/login')

          return { success: false }
        }

        if (onError) onError(e)

        if (!disabledErrorMessage) {
          Notification.error(
            (handleError && (ERROR_MESSAGE[handleError(error)] || handleError(error)))
            || (ERROR_MESSAGE[error.messageCode] || error.messageCode)
            || error.message
          )
        }
      }

      self.type = null

      return { success, data, payload }
    })
  }))

const createTypes = (typeArray) => lodash.reduce(typeArray, (map, value) => {
  map[value] = value

  return map
}, {})

export {
  Model,
  createTypes
}
