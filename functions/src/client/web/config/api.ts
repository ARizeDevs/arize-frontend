import axios from 'axios'

// export const baseURL = 'https://arize-backend-development-ikrcogluxq-uc.a.run.app'
// export const baseURL = 'https://arizebackend-ikrcogluxq-uc.a.run.app'
export const baseURL = 'http://localhost:8080'

export default axios.create({ baseURL })