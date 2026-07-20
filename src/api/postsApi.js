import axiosInstance from './axiosInstance'

// Gets all posts  from the feed
export const getPosts = () => {
  return axiosInstance.get('posts/')
}

// Creates a new post
export const createPost = (postData) => {
  return axiosInstance.post('posts/', postData)
}

// Updates an existing post by its id
export const updatePost = (id, postData) => {
  return axiosInstance.patch(`posts/${id}/`, postData)
}

// Deletes a post by its id
export const deletePost = (id) => {
  return axiosInstance.delete(`posts/${id}/`)
}