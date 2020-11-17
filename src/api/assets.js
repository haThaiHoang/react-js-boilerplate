import { MainApi, ExternalApi } from './endpoint'

// eslint-disable-next-line no-async-promise-executor
export const uploadFiles = ({ files }) => new Promise(async (resolve, reject) => {
  try {
    const signedPayload = Array.from(files)
      .map((file) => {
        const fileNamePaths = file.name.split('.')
        return ({
          filename: fileNamePaths[0],
          filetype: (fileNamePaths[fileNamePaths.length - 1]).toLowerCase()
        })
      })

    const signedResult = await MainApi.post('/presign', { files: signedPayload })

    const promiseArray = []
    signedResult.data.forEach(async (item, index) => {
      promiseArray.push(ExternalApi.put(item.presignUrl, files[index]))
    })
    await Promise.all(promiseArray)

    resolve({
      data: signedResult.data.map((item) => item.url)
    })
  } catch (e) {
    reject(e)
  }
})
