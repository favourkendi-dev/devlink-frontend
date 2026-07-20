import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

// This runs BEFORE every single request axiosInstance makes We use it to automatically attach the access token if we have one so we don't have to manually add it every time we call the API
axiosInstance.interceptors.request.use((config) => {
  const storedTokens = localStorage.getItem('authTokens')

  if (storedTokens) {
    const tokens = JSON.parse(storedTokens)
    config.headers.Authorization = `Bearer ${tokens.access}`
  }

  return config
})

export default axiosInstance