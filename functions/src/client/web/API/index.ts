import axios from '../config/api'
import { getTokenID } from './utils'

const postServerRoute = '/post'

export const deletePost = async (id : string ) => {
    const tokenId = await getTokenID()

    return axios.delete(`${postServerRoute}/${id}`,{
        headers : {
            'Authorization' : tokenId
        }
    })
}

export const getRelatedPosts = async (id : string) => {
    return axios.get(`${postServerRoute}/${id}/related`)
}

export const getPost = async (id : string , author : boolean) => {
    return axios.get(`${postServerRoute}/${id}${author?'?author=true':''}`)
}

export const savePost = async (title : string, description : string, tags : string[] ,
    imageBase64Encoded : string,
    actionBUttonTextColor : string, actionButtonColor : string, actionButtonLink : string, actionButtonText : string,
    actionInfoBackgroundColor : string , hasShadow : boolean, autoPlay : boolean,
    postBackgroundImageBase64 : string,
    contentFile : any,
       setStatus : (status : string) => void) => {
    try {
        setStatus('saving your post to database')
        const tokenId = await getTokenID()

        const formData = new FormData();

        formData.append('title',title)
        if(hasShadow) formData.append('hasShadow','hasShadow')
        if(autoPlay) formData.append('autoPlay','autoPlay')
        formData.append('description',description)
        formData.append('tags',tags.join(','))
        formData.append('actionBUttonTextColor',actionBUttonTextColor)
        formData.append('actionButtonColor',actionButtonColor)
        formData.append('actionButtonLink',actionButtonLink)
        formData.append('actionButtonText',actionButtonText)
        formData.append('postImageBase64',imageBase64Encoded)
        formData.append('actionInfoBackgroundColor',actionInfoBackgroundColor)
        formData.append('postBackgroundImageBase64',postBackgroundImageBase64)
        formData.append('tokenId',tokenId)
        formData.append('file',contentFile)

        const result = await axios({
            method: "POST",
            url: postServerRoute,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
          })
        
        if(result.status === 200 || result.status === 201) {
            
            setStatus('post created successfully')
            return { success : true }
        }

        return { success : false, error : 'something went wrong' }

    } catch(error) {
        return { success : false, error : 'something went wrong' }

    }
}

export const editPost = async (id : string, title : string, description : string, tags : string[] ,
    imageBase64Encoded : string | null,
    actionBUttonTextColor : string, actionButtonColor : string, actionButtonLink : string, actionButtonText : string,
    actionInfoBackgroundColor : string , hasShadow : boolean | null, autoPlay : boolean | null,
    postBackgroundImageBase64 : string | null,
    contentFile : any,
       setStatus : (status : string) => void) => {
    
    
    try {
        setStatus('saving your post to database')
        const tokenId = await getTokenID()

        const formData = new FormData();

        formData.append('title',title)
        if(autoPlay !== null) {
            if(autoPlay) {
                formData.append('autoPlay','true')
            } else {
                formData.append('autoPlay','false')
            }
        }
        if(hasShadow !== null) {
            if(hasShadow) {
                formData.append('hasShadow','true')
            } else {
                formData.append('hasShadow','false')
            }
        }
        formData.append('description',description)
        formData.append('tags',tags.join(','))
        formData.append('actionBUttonTextColor',actionBUttonTextColor)
        formData.append('actionButtonColor',actionButtonColor)
        formData.append('actionButtonLink',actionButtonLink)
        formData.append('actionButtonText',actionButtonText)
        if(imageBase64Encoded) formData.append('postImageBase64',imageBase64Encoded)
        formData.append('actionInfoBackgroundColor',actionInfoBackgroundColor)
        if(postBackgroundImageBase64) formData.append('postBackgroundImageBase64',postBackgroundImageBase64)
        formData.append('tokenId',tokenId)
        if(contentFile) formData.append('file',contentFile)


        let result = null
        if(contentFile) {
            result = await axios({
                method: "PUT",
                url: `${postServerRoute}/${id}`,
                data: formData,
                headers: {
                  'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
                }
            })
        } else {
            result = await axios({
                method: "PUT",
                url: `${postServerRoute}/${id}`,
                data: formData
            })
        }
        
        if(result.status === 200 || result.status === 201) {
            
            setStatus('post updated successfully')
            return { success : true }
        }

        return { success : false, error : 'something went wrong' }

    } catch(error) {
        return { success : false, error : 'something went wrong' }

    }
}