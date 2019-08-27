import lodash from 'lodash'
import { message } from 'antd'

function isFetchError(error) {
  return !!error && lodash.hasIn(error, 'status') && lodash.isFunction(error.json)
}

async function getFetchError(error) {
  try {
    return await error.json()
  } catch (e) {
    return null
  }
}

class Notification {
  static success(text) {
    message.success(text)
  }

  static warning(text) {
    message.warning(text)
  }

  static async error(error = null) {
    let text

    if (error) {
      const originalError = error

      if (isFetchError(error)) {
        error = await getFetchError(error)
      }

      /* eslint-disable no-console */
      console.error('[notification] error:', error || originalError)
      let textMessage
      if (lodash.isString(error)) {
        textMessage = error
      } else {
        textMessage = error && (error.name || error.message)
      }

      if (lodash.isString(textMessage)) {
        text = textMessage
      }
    }

    message.error(text)
  }
}

export default Notification
