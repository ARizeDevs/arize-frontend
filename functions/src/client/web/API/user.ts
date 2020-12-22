import axios from '../config/api'

import { getTokenID, getUserID } from './utils'

const userServerRoute = '/user'

export const registerUser = (email : string , uid : string , password : string) => {
    if(password) {
        return axios.post(userServerRoute, { email, password })
    } else {
        if(uid) {
            return axios.post(userServerRoute, { email, uid } )
        } else {
            throw new Error('no password or uid')
        }
    }
}

export const editUser = async (updatedFields : {} , base64Image? : string) => {
    const tokenId = await getTokenID()
    const data : any = { updatedFields, tokenId }
    if(base64Image) data.base64Image = base64Image
    return axios.put(userServerRoute, data)
}

export const getUser = async (getPosts : boolean) => {
    const uid = getUserID()
    
    return axios.get(`${userServerRoute}/${uid}${getPosts?'?posts=true':''}` )
}

export const checkProfile = async (uid : string, email : string) => {
    return axios.post(`${userServerRoute}/check-profile`, { email, uid })
}