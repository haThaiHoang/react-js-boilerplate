import { MainApi } from './endpoint'

export function getRoles() {
  return MainApi.get('/admin/roles')
}

export function addRole(payload) {
  return MainApi.post('/admin/add-role', payload)
}

export function updateRole(payload) {
  return MainApi.post('/admin/update-role', payload)
}

export function deleteRole(payload) {
  return MainApi.post('/admin/delete-role', payload)
}

export function getPermissions() {
  return MainApi.get('/admin/permissions')
}
