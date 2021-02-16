import firebase from 'firebase'
import axios from '../config/api'
import { getTokenID } from './utils'

const postServerRoute = '/post'


export const sharePost = async (UUID : string, location : { lat : string, long : string }, postID : string) => {
    firebase.analytics().logEvent('share', { post : postID, viewer : UUID })
    return axios.post(`${postServerRoute}/${postID}/share`, {
        UUID,
        location
    })
}

export const view3DPost = async (UUID : string, location : { lat : string, long : string }, postID : string) => {
    firebase.analytics().logEvent('3d_view', { post : postID, viewer : UUID })
    return axios.post(`${postServerRoute}/${postID}/3dview`, {
        UUID,
        location
    })
}

export const viewARPost = async (UUID : string, location : { lat : string, long : string }, postID : string) => {
    firebase.analytics().logEvent('ar_view', { post : postID, viewer : UUID })
    return axios.post(`${postServerRoute}/${postID}/arview`, {
        UUID,
        location
    })
}

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

export const savePost = async (
    title : string, 
    description : string, 
    tags : string[] ,
    hasShadow : boolean,
    shadowIntensity : string,
    shadowSoftness : string,
    hasARButton : boolean,
    arButtonBackgroundColor : string,
    arButtonTextColor : string,
    hasShareButton : boolean,
    shareButtonBackgroundColor : string,
    shareButtonTextColor : string,
    allowScaling : boolean,
    exposure : string,
    solidBackgroundColor : string,
    isOntheGround : boolean,
    autoPlay : boolean,
    imageBase64Encoded : string,
    postBackgroundImageBase64 : string,
    contentFile : any) => {
    try {
        const tokenId = await getTokenID()

        const formData = new FormData();

        formData.append('title',title)
        formData.append('description',description)
        formData.append('tags',tags.join(','))
        if(autoPlay) formData.append('autoPlay','autoPlay')
        
        if(hasShadow) {
            formData.append('hasShadow','hasShadow')
            formData.append('shadowIntensity',shadowIntensity)
            formData.append('shadowSoftness', shadowSoftness)
        }

        if(hasARButton) {
            formData.append('hasARButton','hasARButton')
            formData.append('arButtonBackgroundColor', arButtonBackgroundColor)
            formData.append('arButtonTextColor',arButtonTextColor)
        }

        if(hasShareButton) {
            formData.append('hasShareButton','hasShareButton')
            formData.append('shareButtonBackgroundColor', shareButtonBackgroundColor)
            formData.append('shareButtonTextColor',shareButtonTextColor)
        }

        if(allowScaling) formData.append('allowScaling','allowScaling')

        formData.append('exposure',exposure)

        if(isOntheGround) {
            formData.append('placement','ON_THE_GROUD')
        } else {
            formData.append('placement','ON_THE_WALL')
        }

        formData.append('solidBackgroundColor',solidBackgroundColor)

        formData.append('postImageBase64',imageBase64Encoded)
        formData.append('postBackgroundImageBase64',postBackgroundImageBase64)
        formData.append('tokenId',tokenId)
        formData.append('file',contentFile)

        const result = await axios({
            method: "POST",
            url: postServerRoute,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        
        if(result.status === 200 || result.status === 201) {
            return { success : true , data : result.data.data}
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
    actionButtonInfoText : string,
    actionButtonInfoTextColor : string,
    hasCallToAction : boolean,
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
        if(hasCallToAction) {
            formData.append('hasCallToAction','true')
        }
        formData.append('description',description)
        formData.append('tags',tags.join(','))
        formData.append('actionBUttonTextColor',actionBUttonTextColor)
        formData.append('actionButtonColor',actionButtonColor)
        formData.append('actionButtonLink',actionButtonLink)
        formData.append('actionButtonInfoText',actionButtonInfoText)
        formData.append('actionButtonInfoTextColor',actionButtonInfoTextColor)
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
                  'Content-Type': 'multipart/form-data'
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