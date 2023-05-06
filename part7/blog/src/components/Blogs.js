import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs, likeBlog, deleteBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <ul>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={(b) => dispatch(likeBlog(b))} 
          deleteBlog={(b) => dispatch(deleteBlog(b))} />
      )}
    </ul>
  )
}

export default Blogs