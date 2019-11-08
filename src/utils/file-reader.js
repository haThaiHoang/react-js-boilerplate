export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

export const openDownloadLink = ({ url, data, filename }) => {
  const downloadUrl = url || data
  const a = document.createElement('a')

  if (typeof a.download === 'undefined') {
    window.location = downloadUrl
  } else {
    a.href = downloadUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
  }

  document.body.removeChild(a)
}
