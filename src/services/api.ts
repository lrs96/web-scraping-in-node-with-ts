import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.premierleague.com'
})

export default api;