
const createFileFromURL = (url : string) => {
  return new Promise((resolve, reject) => {
    let blob : Blob|null = null
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.responseType = "blob"
    xhr.onload = function() 
    {
        blob  = xhr.response

        const fileName = url.indexOf('?') === -1 ? url.substring(url.lastIndexOf('/')+1) : url.substring(url.lastIndexOf('/')+1,url.indexOf('?'))

        console.log(fileName);
        
        if(blob) {
          resolve(new File([blob], fileName))
        } else {
          reject('something wrong')
        }
    }
    xhr.send()
  })
}

export default createFileFromURL