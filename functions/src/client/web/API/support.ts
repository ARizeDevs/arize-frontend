import axios from '../config/api'

import { getTokenID } from './utils'

const supportRoute = '/support'


export const createTicket = async (title : string, description : string , type: "SUPPORT"| "FEATURE_REQUEST") => {
    const tokenId = await getTokenID()
    return axios.post(`${supportRoute}`, { title, description, type, tokenId})
}

