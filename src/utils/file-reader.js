export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(new File([file], 'ooo', { type: 'text/csv' }))
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

export const openDownloadLink = (data, filename) => {
  const downloadUrl = `data:text/csv;base64,${data}`
  const a = document.createElement('a')

  if (typeof a.download === 'undefined') {
    window.location = downloadUrl
  } else {
    a.href = downloadUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
  }
}

export const readAsDataURL = (file, callback) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    callback(e.target.result)
  }
  reader.readAsDataURL(file)
}
