import moment from 'moment'

export default class Format {
  static numeric = (number) => (number || 0).toLocaleString(
    undefined, { minimumFractionDigits: 0 }
  )

  static shortDay = (day) => (day ? moment(day).format('DD/MM/YYYY') : '--')

  static age = (day) => moment().diff(day, 'years', false)
}
