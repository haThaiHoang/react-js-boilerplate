import { MainApi } from './endpoint'

export function login(payload) {
  return MainApi.post('/login', payload)
}
