// import { MainApi } from './endpoint'
import mockData from '@/utils/mock-api'

export function login(/* payload */) {
  // return MainApi.post('/login', payload)

  return mockData({
    data: {
      success: true,
      result: {
        token: 'SH6643HDHJSGFJSD73475674856'
      }
    }
  })
}
