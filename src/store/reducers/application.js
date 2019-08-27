import lodash from 'lodash'
import moment from 'moment'

import { TYPES } from '@/store/actions'
import { CHECK_STATUS } from '@/constants'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  applications: [],
  countries: [],
  sendMailLogs: [],
  params: {
    type: '',
    pageNo: 1,
    totalDoc: 0,
    totalData: 100,
    sort: '',
    paramSearch: '',
    businessId: '',
    registerSiteName: '',
    isChecked: CHECK_STATUS.ALL.value
  },
  check: {
    checkAll: false,
    checkRows: [],
    indeterminateCheckAll: false
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_COUNTRIES_REQUEST:
    case TYPES.GET_APPLICATIONS_REQUEST:
    case TYPES.UPDATE_APPLICATION_REQUEST:
    case TYPES.MOVE_APPLICATIONS_REQUEST:
    case TYPES.GET_SEND_MAIL_LOG_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.SEND_MAIL_WRONG_PASSPORT_REQUEST:
      return {
        ...state,
        submitting: action.type + action.payload.typeMail
      }
    case TYPES.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        loaded: true,
        submitting: null,
        countries: action.data.countries
      }
    case TYPES.GET_APPLICATIONS_SUCCESS:
      const { isChecked } = action.payload

      return {
        ...state,
        loaded: true,
        submitting: null,
        applications: action.data.applications,
        params: {
          ...state.params,
          ...action.payload,
          totalDoc: action.data.totalDoc,
          isChecked: isChecked === true ? CHECK_STATUS.CHECKED.value
            : isChecked === false ? CHECK_STATUS.NOT_CHECK.value
              : CHECK_STATUS.ALL.value
        },
        check: {
          checkAll: false,
          checkRows: [],
          indeterminateCheckAll: false
        }
      }
    case TYPES.UPDATE_APPLICATION_SUCCESS: {
      let applications = state.applications.map((item) => {
        if (item.id === action.data.id) {
          return action.data
        }
        return item
      })
      const removeChecked = state.params.isChecked === CHECK_STATUS.NOT_CHECK.value && action.data.isChecked
      const removeNotChecked = state.params.isChecked === CHECK_STATUS.CHECKED.value && !action.data.isChecked
      if (removeChecked || removeNotChecked) {
        applications = applications.filter(item => item.id !== action.data.id)
      }

      return {
        ...state,
        loaded: true,
        submitting: null,
        applications
      }
    }
    case TYPES.MOVE_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loaded: true,
        submitting: null,
        applications: state.applications
          .filter(application => !lodash.some(action.payload.ids, { id: application.id }))
      }
    case TYPES.GET_SEND_MAIL_LOG_SUCCESS:
      return {
        ...state,
        loaded: true,
        submitting: null,
        sendMailLogs: action.data.mailLogs
      }
    case TYPES.SEND_MAIL_WRONG_PASSPORT_SUCCESS:
      return {
        ...state,
        loaded: true,
        submitting: null,
        sendMailLogs: [{
          createdAt: moment(),
          type: action.payload.typeMail
        }].concat(state.sendMailLogs)
      }
    case TYPES.GET_COUNTRIES_FAILURE:
    case TYPES.GET_APPLICATIONS_FAILURE:
    case TYPES.UPDATE_APPLICATION_FAILURE:
    case TYPES.MOVE_APPLICATIONS_FAILURE:
    case TYPES.SEND_MAIL_WRONG_PASSPORT_FAILURE:
    case TYPES.GET_SEND_MAIL_LOG_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    case TYPES.SET_APPLICATION_STORE_PARAMS: {
      const { type } = action.data
      delete action.data.type
      return {
        ...state,
        [type]: {
          ...state.params,
          ...action.data
        }
      }
    }
    case TYPES.RESET_APPLICATION_STORE:
      return INIT_STATE
    default:
      return state
  }
}
