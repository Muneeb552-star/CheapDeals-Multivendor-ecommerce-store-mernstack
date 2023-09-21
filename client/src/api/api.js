import axios from 'axios'

const domain = 'http://localhost:5000'
const production = ''

const api = axios.create({
    baseURL: `${domain}/api`
})

export default api