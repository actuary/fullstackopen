import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createNewBlog = jest.fn()
  const blogFormRef = jest.mock()
  const current = jest.mock()
  const toggleVisibility = jest.fn()
  current.toggleVisibility = jest.fn()
  blogFormRef.current = current
  const user = userEvent.setup()

  const { container } = render(<BlogForm createNewBlog={createNewBlog} blogFormRef={blogFormRef} />)

  const titleInput = container.querySelector('#new-blog-title')
  const authorInput = container.querySelector('#new-blog-author')
  const urlInput = container.querySelector('#new-blog-url')

  const sendButton = container.querySelector('#create-new-blog')

  await user.type(titleInput, 'baah')
  await user.type(authorInput, 'sheep')
  await user.type(urlInput, 'www.bloggo.com')
  await user.click(sendButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0]).toEqual(['baah', 'sheep', 'www.bloggo.com'])
})