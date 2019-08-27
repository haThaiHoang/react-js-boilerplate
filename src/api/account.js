import { AuthApi, MainApi } from './endpoint'

export function login(payload) {
  return AuthApi.post('/admin/login', payload)
}

export function getAccountInfo() {
  return MainApi.get('/admin/get-permission-and-usercode')
}
