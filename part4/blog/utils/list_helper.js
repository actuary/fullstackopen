const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favouriteBlog = (blogs) => (
  blogs.reduce((maxSoFar, blog) => maxSoFar.likes < blog.likes ? blog : maxSoFar)
)

const mostBlogs = (blogs) => (
  _.map(_.countBy(blogs, 'author'), (val, key) => ({ author: key, blogs: val })).slice(-1)[0]
)

const mostLikes = (blogs) => (
  _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes')
    }))
    .sortBy((blog) => blog.likes)
    .value()
    .slice(-1)[0]

)

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}