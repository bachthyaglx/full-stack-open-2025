const Note = require('./note')
const User = require('./user')
const Blog = require('./blog')
const Team = require('./team')
const Membership = require('./membership')
const UserNotes = require('./user_notes')
const ReadingList = require('./readinglist')
const Session = require('./session')

// Relationships

Note.belongsTo(User)
User.hasMany(Note)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' })
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' })

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })

module.exports = {
  Note,
  User,
  Blog,
  Team,
  Membership,
  UserNotes,
  ReadingList,
  Session
}
