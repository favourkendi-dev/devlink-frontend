import axios from 'axios'

// I created a single axios instance that always points to our Django backend this way  every API file we create just imports this instead of typing the full backend URL every time

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

export default axiosInstance