import axios from "axios";


export const authAxios = axios.create({
    baseURL: '/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

