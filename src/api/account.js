// import { MainApi } from './endpoint'
import mockData from '@/utils/mock-data'

export function login(/* payload */) {
  // return MainApi.post('/login', payload)

  return mockData({
    success: true,
    result: {
      token: 'SH6643HDHJSGFJSD73475674856'
    }
  })
}
