const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const firstBlog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 30000);

describe('Get blogs', () => {
  test('blogs returned as json', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('get 10 blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    expect(titles).toContain(
      'The Art of Photography'
    )
  })

  test('unique id property of blog posts is named id', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    expect(firstBlog.id).toBeDefined()
  })
})

describe('Make new blogs', () => {
  test('can add a new blog', async () => {
    const newBlog = {
      "title": "The Benefits of Yoga",
      "author": "Alexandra Kim",
      "url": "https://www.benefitsofyoga.com",
      "likes": 148
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
  
    expect(titles).toContain(
      'The Benefits of Yoga'
    )
  })

  test("if blogs initialised with no likes, it's set to 0", async () => {
    const newBlog = {
      "title": "The Benefits of Yoga",
      "author": "Alexandra Kim",
      "url": "https://www.benefitsofyoga.com",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blog = response.body

    expect(blog.likes).toBeDefined()
    expect(blog.likes).toBe(0)
  })

  test("if blogs initialised with no title, responds with 400", async () => {
    const newBlog = {
      "author": "Alexandra Kim",
      "url": "https://www.benefitsofyoga.com",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test("if blogs initialised with no url, responds with 400", async () => {
    const newBlog = {
      "title": "The Benefits of urls@",
      "author": "Alexandra Kim",
      "likes": 0
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs is', () => {
  test('successful if id exists', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)
  })

  test('fails if id does not exist', async () => {
    await api.delete("/api/blogs/ERRRO").expect(404)
  })
})

describe('updating blogs', () => {
  test('can update the likes for the blog', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]
    const id = firstBlog.id
    const likes = firstBlog.likes

    const alteredBlog = {
      title: firstBlog.title,
      url: firstBlog.url,
      author: firstBlog.author,
      likes: firstBlog.likes + 1
    }
    await api.put(`/api/blogs/${id}`).send(alteredBlog).expect(204)

    const endBlogs = await helper.blogsInDb()
    const blogWeUpdated = endBlogs.find((blog) => blog.id === id)

    expect(blogWeUpdated.likes).toBe(likes + 1)
  })

})



afterAll(async () => {
  await mongoose.connection.close()
})