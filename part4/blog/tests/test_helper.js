const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "The Joy of Baking",
    "author": "Mary Smith",
    "url": "https://www.joyofbaking.com",
    "likes": 102
  },
  {
    "title": "Hiking the Appalachian Trail",
    "author": "John Doe",
    "url": "https://www.hikeappalachia.com",
    "likes": 205
  },
  {
    "title": "The Art of Photography",
    "author": "Jane Johnson",
    "url": "https://www.artofphotography.com",
    "likes": 321
  },
  {
    "title": "Exploring the World of Wine",
    "author": "David Lee",
    "url": "https://www.worldofwine.com",
    "likes": 76
  },
  {
    "title": "The Science of Climate Change",
    "author": "Sarah Williams",
    "url": "https://www.climatechange.com",
    "likes": 453
  },
  {
    "title": "The Wonders of the Ocean",
    "author": "Michael Brown",
    "url": "https://www.oceanwonders.com",
    "likes": 289
  },
  {
    "title": "The History of Jazz Music",
    "author": "Tom Jones",
    "url": "https://www.historyofjazz.com",
    "likes": 167
  },
  {
    "title": "The Thrill of Adventure Travel",
    "author": "Lisa Green",
    "url": "https://www.adventuretravel.com",
    "likes": 215
  },
  {
    "title": "The Secrets of Successful Entrepreneurs",
    "author": "Peter Lee",
    "url": "https://www.successfulentrepreneurs.com",
    "likes": 524
  },
  {
    "title": "The Beauty of Nature Photography",
    "author": "Emily Chen",
    "url": "https://www.naturephotography.com",
    "likes": 367
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}