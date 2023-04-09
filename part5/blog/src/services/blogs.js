import axios from 'axios'
const baseUrl = '/api/blogs'

var token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async likedBlog => {
  const response = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog)
  return response.data
}

const deleteBlog = async deletedBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${deletedBlog.id}`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken, likeBlog, deleteBlog }