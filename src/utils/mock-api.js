export default function ({ data, error, delay }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    }, delay || 1000)
  })
}
