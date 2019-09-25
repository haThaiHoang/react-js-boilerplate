export default class Format {
  static numeric = (number) => number.toLocaleString(
    undefined, { minimumFractionDigits: 0 }
  )
}
