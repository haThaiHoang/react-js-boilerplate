import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  userCode: null,
  permissions: [],
  roleName: null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST:
    case TYPES.GET_ACCOUNT_INFO_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.GET_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        loaded: !state.loaded.includes(action.type) ? state.loaded.concat(action.type) : state.loaded,
        submitting: null,
        userCode: action.data.userCode,
        permissions: action.data.permission,
        roleName: action.data.roleName
      }
    case TYPES.LOGIN_FAILURE:
    case TYPES.GET_ACCOUNT_INFO_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
