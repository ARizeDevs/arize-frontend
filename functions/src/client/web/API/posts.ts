import axios from '../config/api'
import { getTokenID, getUserID } from './utils'

const postServerRoute = '/post'

export const sharePost = async ( postID : string) => {
    // firebase.analytics().logEvent('share', { post : postID, viewer : UUID })
    return axios.post(`${postServerRoute}/${postID}/share`, {})
}

export const view3DPost = async (postID : string, ua? : string | null, ipAddress? : string | null) => {
    let userAgent = ''
    if(ua) {
        userAgent = ua
    } else {
        userAgent = navigator.userAgent
    }
    // firebase.analytics().logEvent('3d_view', { post : postID, viewer : UUID })
    return axios.post(`${postServerRoute}/${postID}/3dview`, {ip : ipAddress?ipAddress:''} , { headers : { 'user-agent' : userAgent}})
}

export const viewARPost = async ( postID : string) => {
    // firebase.analytics().logEvent('ar_view', { post : postID, viewer : UUID })
    return axios.post(`${postServerRoute}/${postID}/arview`, {})
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

export const getAllPosts = async (author : string | null, startDocId : string | null, offset : number | null , limit : number | null, searchText : string | null) => {
    let id : any = author
    if(!id) id = await getUserID()
    
    return axios.get(`${postServerRoute}?${id?`uid=${id}`:''}&${startDocId?`startDocId=${startDocId}`:''}&${limit?`limit=${limit}`:''}&${offset?`offset=${offset}`:''}&${searchText?`searchText=${searchText}`:''}`)
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
    contentFile : any,
    skyBoxHDRImage : any,
    waterMarkImageBase64 : string,) => {
    try {
        const tokenId = await getTokenID()

        const formData = new FormData();

        formData.append('title',title)
        formData.append('description',description)
        formData.append('tags',tags.join(','))
        if(autoPlay) formData.append('autoPlay','autoPlay')
        
        formData.append('waterMarkImageBase64',waterMarkImageBase64)

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
            formData.append('placement','ON_THE_GROUND')
        } else { 
            formData.append('placement','ON_THE_WALL')
        }

        formData.append('solidBackgroundColor',solidBackgroundColor)

        formData.append('postImageBase64',imageBase64Encoded)
        formData.append('postBackgroundImageBase64',postBackgroundImageBase64)
        formData.append('tokenId',tokenId)
        formData.append('file',contentFile)
        
        if(skyBoxHDRImage) {
            formData.append('skyBoxHDRImage',skyBoxHDRImage)
        }

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

export const editPost = async (
    id : string | null, 
    title : string | null, 
    description : string | null, 
    tags : string[] | null,
    imageBase64Encoded : string | null,
    hasShadow : boolean | null,
    shadowIntensity : string | null,
    shadowSoftness : string | null,
    hasARButton : boolean | null,
    arButtonTextColor : string | null,
    arButtonBackgroundColor : string | null,
    hasShareButton : boolean | null,
    shareButtonBackgroundColor : string | null,
    shareButtonTextColor : string | null,
    allowScaling : boolean | null,
    exposure : string | null,
    isOntheGround : boolean | null,
    solidBackgroundColor : string | null,
    autoPlay : boolean | null,
    postBackgroundImageBase64 : string | null,
    contentFile : any,
    waterMarkImageBase64 : string | null
    ) => {
    
    console.log('-----------')
    console.log(allowScaling)

    try {
        const tokenId = await getTokenID()

        const formData = new FormData();

        formData.append('tokenId',tokenId)

        if(waterMarkImageBase64 !== null) { 
            formData.append('waterMarkImageBase64',waterMarkImageBase64)
        }

        if(title) formData.append('title',title)
        if(description) formData.append('description',description)
        if(tags) formData.append('tags',tags.join(','))

        if(imageBase64Encoded) formData.append('postImageBase64',imageBase64Encoded)
        if(contentFile) formData.append('file',contentFile)
        if(postBackgroundImageBase64) formData.append('postBackgroundImageBase64',postBackgroundImageBase64)

        if(hasShadow !== null) {
            if(hasShadow) {
                console.log('shadow ,',shadowIntensity,'  : ',shadowSoftness)
                formData.append('hasShadow','true')
                if(shadowIntensity) formData.append('shadowIntensity',shadowIntensity)
                if(shadowSoftness) formData.append('shadowSoftness', shadowSoftness)
            } else{
                formData.append('hasShadow','false')
            }
        }

        if(hasARButton !== null) {
            if(hasARButton) {
                formData.append('hasARButton','true')
                if(arButtonBackgroundColor) formData.append('arButtonBackgroundColor', arButtonBackgroundColor)
                if(arButtonTextColor) formData.append('arButtonTextColor',arButtonTextColor)
            } else {
                formData.append('hasARButton','false')
            }        
        }


        if(hasShareButton !== null) {
            if(hasShareButton) {
                formData.append('hasShareButton','true')
                if(shareButtonBackgroundColor) formData.append('shareButtonBackgroundColor', shareButtonBackgroundColor)
                if(shareButtonTextColor) formData.append('shareButtonTextColor',shareButtonTextColor)
            } else {
                formData.append('hasShareButton','false')
            }
        }

        if(allowScaling !== null) {
            if(allowScaling) {
                console.log('scaling added')
                formData.append('allowScaling','true')
            } else {
                console.log('scaling removed')
                formData.append('allowScaling','false')
            }
        }

        if(exposure !== null) {
            formData.append('exposure',exposure)
        }

        if(isOntheGround !== null) {
            if(isOntheGround) {
                formData.append('placement','ON_THE_GROUND')
            } else {
                formData.append('placement','ON_THE_WALL')
            }
        }

        if(solidBackgroundColor !== null) {
            formData.append('solidBackgroundColor',solidBackgroundColor)
        }


        if(autoPlay !== null) {
            if(autoPlay) {
                formData.append('autoPlay','true')
            } else {
                formData.append('autoPlay','false')
            }
        }

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
            
            return { success : true, data : result.data.data }
        }

        return { success : false, error : 'something went wrong' }

    } catch(error) {
        return { success : false, error : 'something went wrong' }

    }
}