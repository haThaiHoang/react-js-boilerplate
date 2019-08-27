import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  businessSystems: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESS_SYSTEM_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_BUSINESS_SYSTEM_SUCCESS:
      const businessSystemReal = action.data.businessSystems.filter(ele => {
        if (ele.url !== '') return ele
      }, [])

      return {
        ...state,
        loaded: true,
        submitting: null,
        businessSystems: businessSystemReal
      }
    case TYPES.GET_BUSINESS_SYSTEM_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
