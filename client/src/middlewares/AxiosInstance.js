import axios from "axios";


export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

