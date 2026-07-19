import axiosInstance from './axiosInstance'

// Sends a POST request to the register endpoint with the user's form data.
export const registerUser = (userData) => {
  return axiosInstance.post('auth/register/', userData)
}