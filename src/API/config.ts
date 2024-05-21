import axios from 'axios';

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: process.env.BASE_API_URL,
});

// API.interceptors.request.use((request) => {
//   console.log(request)
//   return request;
// })

API.interceptors.response.use((response) => {
  console.log(response.data);
  return response;
})

export default API;