const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })

module.exports = { User, Blog, ReadingList}
