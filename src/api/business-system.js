import { MainApi } from './endpoint'

export function getBusinessSystem() {
  return MainApi.get('/business-system')
}
