import Request from 'app/utils/request'
// import Storage from 'app/utils/storage'
import Configs from 'app/configs'

const endpoint = `${Configs.API_URL}/api`
const apiKey = Configs.API_KEY

function checkEndpointAuth() {}

Request.registerInterceptor('endpoint-auth', checkEndpointAuth)

const MainApi = Request.create({
  endpoint,
  apiKey,
  handleToken: true
})

const AuthApi = Request.create({
  endpoint,
  apiKey
})

export { MainApi, AuthApi }
