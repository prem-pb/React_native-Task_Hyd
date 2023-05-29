import axios from "axios";

const API = axios.create({
    baseURL: 'https://gorest.co.in/public-api'
})

API.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer b602f54cd6c36fdd7d0794cd5667646ba0a511e78d7fabe910bc735a1eb6c063'
    config.headers['Accept'] = "application/json, text/plain, */*"
    config.headers.ContentType = "application/json"
    return config
}), function (error) {
    return Promise.reject(error)
}

API.interceptors.response.use(function (response) {
    return response?.data
}), function (error) {
    return Promise.reject(error)
}

export const CreateUser = (data) => API.post('/users', data)
export const getUser = (data) => API.get('/users', data)
export const deleteUser = (id) => API.delete(`/users/${id}`,)
export const updateUser = (id, data) => API.put(`/users/${id}`, data) 
export const getByUser = (id) => API.get(`/users/${id}`) 