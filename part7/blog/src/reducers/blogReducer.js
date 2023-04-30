import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const sortedBlogs = (blogs) => blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
      return sortedBlogs(state)
    },
    append(state, action) {
      state.push(action.payload)
      return sortedBlogs(state)
    },
    setBlogs(state, action) {
      return sortedBlogs(action.payload)
    },
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  },
})

export const { append, create, like, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch(removeBlog(blog.id))
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog({ title, author, url })
    dispatch(append(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.likeBlog({ ...blog, user: blog.user.id, likes: blog.likes + 1 })
    dispatch(like(blog))
  }
}

export default blogSlice.reducer