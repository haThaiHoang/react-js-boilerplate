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
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.LOGIN_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
