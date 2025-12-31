import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://newsdata.io/1',
    withCredentials: false
})

export default instance