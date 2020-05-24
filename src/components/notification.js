import lodash from 'lodash'
import { message, notification } from 'antd'

const show = (type, data) => {
  if (lodash.isObject(data) && data.size === 'large') {
    notification[type](data)
  } else {
    message[type](data)
  }
}

class Notification {
  static show(data) {
    show('success', data)
  }

  static warning(data) {
    show('warning', data)
  }

  static error(data) {
    show('error', data)
  }
}

export default Notification
