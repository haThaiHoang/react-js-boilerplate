import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  roles: [],
  permissions: [],
  businessSystems: [],
  registerSites: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_ROLES_REQUEST:
      return {
        ...state,
        submitting: action.type,
        roles: []
      }
    case TYPES.ADD_ROLE_REQUEST:
    case TYPES.UPDATE_ROLE_REQUEST:
    case TYPES.DELETE_ROLE_REQUEST:
    case TYPES.GET_PERMISSIONS_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_ROLES_SUCCESS:
      return {
        ...state,
        loaded: !state.loaded.includes(action.type) ? state.loaded.concat(action.type) : state.loaded,
        submitting: null,
        roles: action.data.roles
      }
    case TYPES.ADD_ROLE_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        submitting: null,
        roles: state.roles.filter(item => item.id !== action.payload.id)
      }
    case TYPES.GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        submitting: null,
        permissions: action.data.permission.permission,
        businessSystems: action.data.permission.conditions['permission.condition.business_system'].data,
        registerSites: action.data.permission.conditions['permission.condition.register_site'].data
      }
    case TYPES.GET_ROLES_FAILURE:
    case TYPES.ADD_ROLE_FAILURE:
    case TYPES.UPDATE_ROLE_FAILURE:
    case TYPES.DELETE_ROLE_FAILURE:
    case TYPES.GET_PERMISSIONS_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
