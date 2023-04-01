const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog( {...blog, user: user._id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 30000);



describe('when there is initially one user in db', () => {
  test('logging in succeeds for that user', async () => {
    const results  = await api
      .post('/api/login')
      .send({"username": "root", "password": "sekret"})
      .expect(200)

    expect(results.body.token).toBeDefined()
  })

  test('logging in fails for bad password', async () => {
    const results  = await api
      .post('/api/login')
      .send({"username": "root", "password": "badpassword"})
      .expect(401)

    expect(results.body.error).toContain('invalid username or password')
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dan',
      name: 'dan v',
      password: 'ac',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

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
  test('fails if not logged in', async () => {
    const newBlog = {
      "title": "The Benefits of Yoga",
      "author": "Alexandra Kim",
      "url": "https://www.benefitsofyoga.com",
      "likes": 148
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('can add a new blog while logged in', async () => {
    const result = await api.post('/api/login').send({"username": "root", "password": "sekret"})
    const token = result.body.token

    const newBlog = {
      "title": "The Benefits of Yoga",
      "author": "Alexandra Kim",
      "url": "https://www.benefitsofyoga.com",
      "likes": 148
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
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
    const result = await api.post('/api/login').send({"username": "root", "password": "sekret"})
    const token = result.body.token

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
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
    const result = await api.post('/api/login').send({"username": "root", "password": "sekret"})
    const token = result.body.token

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
  })

  test("if blogs initialised with no url, responds with 400", async () => {
    const newBlog = {
      "title": "The Benefits of urls@",
      "author": "Alexandra Kim",
      "likes": 0
    }

    const result = await api.post('/api/login').send({"username": "root", "password": "sekret"})
    const token = result.body.token

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs is', () => {
  test('unsuccessful if not logged in', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id

    const result = await api
      .delete(`/api/blogs/${id}`)
      .expect(400)

    expect(result.body.error).toContain('jwt must be provided')
  })

  test('successful if id exists', async () => {
    const result = await api.post('/api/login').send({"username": "root", "password": "sekret"})
    const token = result.body.token

    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)
  })

  test('fails if id does not exist', async () => {
    const result = await api.post('/api/login').send({"username": "root", "password": "sekret"})
    const token = result.body.token

    const fakeId = new mongoose.Types.ObjectId();

    const response = await api
      .delete(`/api/blogs/${fakeId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(404)

    expect(response.body.error).toContain('Not found')
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