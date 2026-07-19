import axiosInstance from './axiosInstance'

// Sends a POST request to the register endpoint with the user's form data.
export const registerUser = (userData) => {
  return axiosInstance.post('auth/register/', userData)
}

// Sends username  and  password to the login endpoint amd on sucess it returns access and refresh tokens

export const loginUser = (credentials) => {
  return axiosInstance.post('auth/login/', credentials)
}