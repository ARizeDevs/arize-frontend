
const createFileFromURL = (url : string) => {
  return new Promise((resolve, reject) => {
    let blob = null
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.responseType = "blob"
    xhr.onload = function() 
    {
        blob = xhr.response
        resolve(new File([blob], blob))
    }
    xhr.send()
  })
}

export default createFileFromURL