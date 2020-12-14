import axios from 'axios'

export const baseURL = 'https://arizebackend-ikrcogluxq-uc.a.run.app'

export default axios.create({
    baseURL
})