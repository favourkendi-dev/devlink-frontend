import axiosInstance from './axiosInstance'

// Gets the currently logged in user's profile.
export const getProfile = () => {
  return axiosInstance.get('auth/profile/')
}

// Updates the currently logged in user's profile updatedData will be an object like { bio, github_url, skills }
export const updateProfile = (updatedData) => {
  return axiosInstance.patch('auth/profile/', updatedData)
}