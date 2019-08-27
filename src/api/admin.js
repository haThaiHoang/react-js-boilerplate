import { MainApi } from './endpoint'

export function getAllAdmin() {
  return MainApi.get('/admin/get-all-admin')
}

export function deleteAdmin(payload) {
  return MainApi.post('/admin/delete-admin', payload)
}

export function addSubAdmin(payload) {
  return MainApi.post('/admin/add-sub-admin', payload)
}

export function updateAdmin(payload) {
  return MainApi.post('/admin/update-admin', payload)
}
