import { message } from 'antd'

class Notification {
  static success(text) {
    message.success(text)
  }

  static warning(text) {
    message.warning(text)
  }

  static error(text) {
    message.error(text)
  }
}

export default Notification
