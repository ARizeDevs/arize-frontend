
const createFileFromURL = (url : string) => {
  return new Promise((resolve, reject) => {
    let blob : Blob|null = null
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.responseType = "blob"
    xhr.onload = function() 
    {
        blob  = xhr.response
        resolve(new File([blob], url.substring(url.lastIndexOf('/')+1)))
    }
    xhr.send()
  })
}

export default createFileFromURL