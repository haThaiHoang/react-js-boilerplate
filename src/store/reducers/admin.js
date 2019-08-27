import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: false,
  submitting: null,
  error: null,

  admins: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_ADMIN_REQUEST:
    case TYPES.DELETE_ADMIN_REQUEST:
    case TYPES.ADD_SUB_ADMIN_REQUEST:
    case TYPES.UPDATE_ADMIN_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_ALL_ADMIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        submitting: null,
        admins: action.data ? action.data.admins : INIT_STATE.admins
      }
    case TYPES.DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        submitting: null,
        admins: state.admins.filter(item => item.id !== action.payload.id)
      }
    case TYPES.ADD_SUB_ADMIN_SUCCESS: {
      let { admins } = state
      if (action.data && action.data.id) {
        admins = [...admins, action.data]
      }
      return {
        ...state,
        loaded: true,
        submitting: null,
        admins
      }
    }
    case TYPES.UPDATE_ADMIN_SUCCESS: {
      const admins = state.admins.map((item) => {
        if (item.id === action.data.id) {
          return { ...item, ...action.data }
        }
        return item
      })
      return {
        ...state,
        loaded: true,
        submitting: null,
        admins
      }
    }
    case TYPES.GET_ALL_ADMIN_FAILURE:
      return {
        ...state,
        loaded: true,
        submitting: null,
        error: action.error,
        admins: INIT_STATE.admins
      }
    case TYPES.DELETE_ADMIN_FAILURE:
    case TYPES.ADD_SUB_ADMIN_FAILURE:
    case TYPES.UPDATE_ADMIN_FAILURE:
      return {
        ...state,
        loaded: true,
        submitting: null,
        error: action.error
      }
    case TYPES.RESET_ADMIN:
      return INIT_STATE
    default:
      return state
  }
}
