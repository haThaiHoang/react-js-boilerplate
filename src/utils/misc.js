import lodash from 'lodash'
import moment from 'moment'

import Configs from '@/configs'
import { GENDER } from '@/constants'

export default class Misc {
  static trimObjectProperties = (obj, properties) => {
    const data = lodash.cloneDeep(obj)

    if (lodash.isArray(properties)) {
      properties.forEach((property) => {
        data[property] = data[property]?.trim()
      })
    } else {
      lodash.keys(obj).forEach((key) => {
        data[key] = data[key]?.trim()
      })
    }

    return data
  }

  static getPassportURL = name => name && `${Configs.API_URL}/${name}`

  static getUrlVars() {
    const vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value
    })
    return vars
  }

  static getPeriod = (experiod) => {
    const experiodMoment = moment(experiod).startOf('date')
    const now = moment().startOf('date')
    const years = experiodMoment.diff(now, 'years')
    let months = experiodMoment.diff(now, 'months') - years * 12
    let period = ''
    if (experiodMoment.isSameOrBefore(now)) {
      return 'Expired'
    }
    if (years > 0) {
      period = `${years} year${years > 1 ? 's' : ''}`
    }
    if (months > 0) {
      period += `${period ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`
    }
    if (years === 0 && months === 0) {
      period = 'less than 1 month'
    }
    return period
  }

  static objectRemoveBlank = object => lodash.reduce(lodash.keys(object), (result, key) => {
    if (object[key] !== '' && object[key] !== null) result[key] = object[key]

    return result
  }, {})

  static getGender = (gender) => {
    switch (gender) {
      case GENDER.MALE:
        return 'Male'
      case GENDER.FEMALE:
        return 'Female'
      case GENDER.NOTAPPLICABLE:
        return 'NotApplicable'
      default:
        return 'NotApplicable'
    }
  }
}
