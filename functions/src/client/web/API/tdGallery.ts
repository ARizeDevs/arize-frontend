import { async } from 'q'
import axios from  '../config/api'

const tdGalleryRoute = '/TDGallery'

export const getAllTDGallery = async (startDocId: string | null, offset: number | null, limit: number | null, searchText: string | null) => {
    
    return axios.get(`${tdGalleryRoute}?${startDocId?`startDocId=${startDocId}`:''}&${limit?`limit=${limit}`:''}&${offset?`offset=${offset}`:''}&${searchText?`searchText=${searchText}`:''}`)

} 

export const getTDGalleryItem = async(name: string) => {
    return axios.get(`${tdGalleryRoute}/${name}`)
}
