import axios from 'axios'

export const baseURL = 'http://localhost:8080'

export default axios.create({
    baseURL
})