export default function (data, error, condition = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (condition) {
        resolve(data)
      } else {
        reject(error)
      }
    }, 1000)
  })
}
