import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Note />', () => {
  let container
  let updateBlog

  beforeEach(() => {
    const user = {
      username: "dvdog"
    }
    const blog = {
      title: "Big ol blog",
      author: "Blogger",
      likes: 17,
      url: "www.blog.com",
      user: user
    }

    updateBlog = jest.fn()
    const deleteBlog = jest.fn()

    container = render(<Blog blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />).container
  })

  test('renders title and author', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Big ol blog'
    )
    expect(div).toHaveTextContent(
      'Blogger'
    )
  })

  test('does not initially render url or number of likes by default', async () => {
    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent(
      'www.blog.com'
    )
    expect(div).not.toHaveTextContent(
      'likes'
    )
  })

  test('shows url and likes after clicking button', async () => {
    const evt = userEvent.setup()
    const button = container.querySelector('#show-details')
    screen.findBy
    await evt.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'www.blog.com'
    )
    expect(div).toHaveTextContent(
      'likes'
    )
  })

  test('like button clicked twice, calls event handler twice', async () => {
    const evt = userEvent.setup()
    const button = container.querySelector('#show-details')
    await evt.click(button)

    const likeButton = container.querySelector('#like-button')
    await evt.click(likeButton)
    await evt.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})