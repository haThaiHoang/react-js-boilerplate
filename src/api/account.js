import { MainApi } from './endpoint'

export function login(payload) {
  return MainApi.post('/admin/login', payload)
}
