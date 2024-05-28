import axios from 'axios';

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: 'http://192.168.9.109/api/v1'
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