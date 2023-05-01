export const summariseUsers = (users) => {
  return users.map((user) => ({ name: user.name, numberOfBlogs: user.blogs.length }))
}