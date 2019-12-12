export default function ({ data, error }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    }, 1000)
  })
}
