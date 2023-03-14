require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.NODE_ENV == "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
}