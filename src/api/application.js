import toFormData from 'object-to-formdata'

import { MainApi } from './endpoint'

export function getCountries() {
  return MainApi.get('/get-countries')
}

export function sendMailWrongPassport(payload) {
  return MainApi.post('/admin/send-mail-wrong-passport', payload)
}

export function getSendMailLog(payload) {
  return MainApi.post('/admin/get-send-mail-log', payload)
}

export function getApplications({ type, ...payload }) {
  let url = ''

  switch (type) {
    case 'paid-uncheck':
      url = '/application/get-paid-uncheck'
      break
    case 'unpaid':
      url = '/application/get-unpaid'
      break
    case 'reconfirm-paid-checked':
      url = '/application/get-reconfirm-paid-checked'
      break
    case 'reconfirm-paid-unchecked':
      url = '/application/get-reconfirm-paid-unchecked'
      break
    case 'reconfirm-input-card-info':
      url = '/application/get-reconfirm-input-card-info'
      break
    case 'paid-checked':
      url = '/application/get-paid-checked'
      break
    default:
  }

  return MainApi.post(url, payload)
}

export function updateApplication({ type, ...payload }) {
  const data = toFormData(payload)
  let url = ''

  switch (type) {
    case 'paid-unchecked':
      url = '/application/update-paid-uncheck'
      break
    case 'reconfirm-paid-unchecked':
      url = '/application/update-reconfirm-paid-uncheck'
      break
    case 'reconfirm-paid-checked':
      url = '/application/update-reconfirm-paid-checked'
      break
    case 'reconfirm-input-card-information':
      url = '/application/update-reconfirm-input-card-information'
      break
    case 'paid-checked':
      url = '/application/update-paid-checked'
      break
    default:
  }

  return MainApi.post(url, data)
}

export function moveApplications({ type, ...payload }) {
  let url = ''
  switch (type) {
    case 'paid-unchecked-to-paid-checked':
      url = '/application/paid-uncheck-to-paid-checked'
      break
    case 'paid-unchecked-to-reconfirm-paid-unchecked':
      url = '/application/paid-uncheck-to-reconfirm-paid-unchecked'
      break
    case 'paid-checked-to-reconfirm-paid-checked':
      url = '/application/paid-checked-to-reconfirm-paid-checked'
      break
    case 'reconfirm-paid-checked-to-paid-checked':
      url = '/application/reconfirm-paid-checked-to-paid-checked'
      break
    case 'reconfirm-paid-unchecked-to-paid-checked':
      url = '/application/reconfirm-paid-unchecked-to-paid-checked'
      break
    case 'reconfirm-input-card-information-to-paid-checked':
      url = '/application/reconfirm-input-card-information-to-paid-checked'
      break
    case 'paid-unchecked-to-reject':
      url = '/application/paid-uncheck-to-reject'
      break
    case 'reconfirm-paid-unchecked-to-reject':
      url = '/application/reconfirm-paid-unchecked-to-reject'
      break
    case 'reconfirm-paid-checked-to-reject':
      url = '/application/reconfirm-paid-checked-to-reject'
      break
    case 'reconfirm-input-card-information-to-reject':
      url = '/application/reconfirm-input-card-information-to-reject'
      break
    case 'paid-checked-to-reject':
      url = '/application/paid-checked-to-reject'
      break
    default:
  }

  return MainApi.post(url, payload)
}
