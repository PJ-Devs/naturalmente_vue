import {API_BASE_URL} from '@/config/constants.js';
import axios from 'axios'

axios.defaults.withCredentials = true

const API = axios.create({
  baseURL: API_BASE_URL
});

// API.interceptors.request.use((request) => {
//   console.log(request)
//   return request;
// })

API.interceptors.response.use((response) => {
  console.log(response.data)
  return response
})

export default API
